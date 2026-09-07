/* Service worker de El Floema Lab.

   1) CACHÉ para poder abrir la app y ver los últimos datos sin señal.
   2) COLA DE ESCRITURAS: si guardas algo sin conexión, la operación se
      apunta en IndexedDB y se reenvía sola cuando vuelve el internet.

   Qué se puede encolar y qué no (importante):
   - PATCH (editar) y DELETE (borrar) → SÍ. Van dirigidos a una fila que ya
     existe, así que reenviarlos después es seguro.
   - POST sin `return=representation` (crear sin necesitar respuesta) → SÍ.
   - POST con `return=representation` → NO. La pantalla está esperando los
     datos que devuelve el servidor (por ejemplo el id de una fórmula nueva
     para luego guardarle los ingredientes). Inventar ese id llevaría a datos
     inconsistentes, así que es mejor avisar que hace falta conexión.
*/

const VERSION = "floema-lab-v3";
const SHELL = `${VERSION}-shell`;
const DATOS = `${VERSION}-datos`;

const RUTAS_BASE = ["/lab", "/lab/inventario", "/lab/formulas", "/lab/preparadas"];

/* ── IndexedDB mínima para la cola ───────────────────────── */
const DB_NOMBRE = "floema-lab-cola";
const TIENDA = "pendientes";

function abrirDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NOMBRE, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(TIENDA)) {
        db.createObjectStore(TIENDA, { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function conTienda(modo, fn) {
  return abrirDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(TIENDA, modo);
        const req = fn(tx.objectStore(TIENDA));
        tx.oncomplete = () => resolve(req && req.result);
        tx.onerror = () => reject(tx.error);
      })
  );
}

const encolar = (registro) => conTienda("readwrite", (s) => s.add(registro));
const listarPendientes = () => conTienda("readonly", (s) => s.getAll());
const borrarPendiente = (id) => conTienda("readwrite", (s) => s.delete(id));

async function contarPendientes() {
  try {
    const todos = await listarPendientes();
    return todos.length;
  } catch {
    return 0;
  }
}

async function avisarClientes() {
  const pendientes = await contarPendientes();
  const clientes = await self.clients.matchAll({ includeUncontrolled: true });
  for (const c of clientes) c.postMessage({ tipo: "cola-offline", pendientes });
}

/* ── Instalación / activación ────────────────────────────── */
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(RUTAS_BASE).catch(() => undefined)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const nombres = await caches.keys();
      await Promise.all(nombres.filter((n) => !n.startsWith(VERSION)).map((n) => caches.delete(n)));
      await self.clients.claim();
      await vaciarCola();
    })()
  );
});

/* ── Reenvío de la cola ──────────────────────────────────── */
let vaciando = false;

async function vaciarCola() {
  if (vaciando) return;
  vaciando = true;
  try {
    const pendientes = await listarPendientes();
    // En orden de llegada: el orden importa (editar y luego borrar, por ejemplo).
    pendientes.sort((a, b) => a.id - b.id);
    for (const p of pendientes) {
      try {
        const res = await fetch(p.url, {
          method: p.metodo,
          headers: p.headers,
          body: p.body ?? undefined,
        });
        // 2xx = guardado. 4xx = el servidor lo rechaza; reintentar no ayuda,
        // así que se descarta para no bloquear el resto de la cola.
        if (res.ok || (res.status >= 400 && res.status < 500)) {
          await borrarPendiente(p.id);
        } else {
          break; // error del servidor: se reintenta más tarde
        }
      } catch {
        break; // sigue sin haber red
      }
    }
  } finally {
    vaciando = false;
    await avisarClientes();
  }
}

self.addEventListener("message", (event) => {
  if (event.data === "sincronizar") event.waitUntil(vaciarCola());
  if (event.data === "estado-cola") event.waitUntil(avisarClientes());
});

self.addEventListener("sync", (event) => {
  if (event.tag === "cola-floema") event.waitUntil(vaciarCola());
});

/* ── Utilidades ──────────────────────────────────────────── */
const esEstaticoInmutable = (url) => url.pathname.startsWith("/_next/static/");
const esSupabase = (url) => url.hostname.endsWith(".supabase.co");
const esMedia = (req, url) =>
  req.destination === "image" ||
  req.destination === "font" ||
  /\.(jpg|jpeg|png|webp|avif|svg|woff2?)$/i.test(url.pathname);

function esEncolable(req) {
  if (!["POST", "PATCH", "DELETE", "PUT"].includes(req.method)) return false;
  const prefer = req.headers.get("Prefer") || "";
  // Si la pantalla espera los datos de vuelta, no se puede fingir la respuesta.
  if (prefer.includes("return=representation")) return false;
  return true;
}

/* ── Interceptor ─────────────────────────────────────────── */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // ── Escrituras a Supabase: intentar red, y si no hay, encolar ──
  if (esSupabase(url) && req.method !== "GET") {
    // La autenticación nunca se encola.
    if (url.pathname.includes("/auth/")) return;

    event.respondWith(
      (async () => {
        const clon = req.clone();
        try {
          const res = await fetch(req);
          // Si hay red, aprovechamos para vaciar lo que quedó pendiente.
          if (res.ok) event.waitUntil(vaciarCola());
          return res;
        } catch {
          if (!esEncolable(clon)) {
            return new Response(
              JSON.stringify({
                message:
                  "Sin conexión. Esta acción necesita internet porque el servidor debe responder con datos (por ejemplo, el id de algo nuevo).",
                offline: true,
              }),
              { status: 503, headers: { "Content-Type": "application/json" } }
            );
          }

          const headers = {};
          clon.headers.forEach((v, k) => (headers[k] = v));
          let body = null;
          try {
            body = await clon.text();
          } catch {
            /* sin cuerpo */
          }

          await encolar({ url: clon.url, metodo: clon.method, headers, body, fecha: Date.now() });
          if ("sync" in self.registration) {
            try {
              await self.registration.sync.register("cola-floema");
            } catch {
              /* Background Sync no disponible: se reenvía al volver online */
            }
          }
          await avisarClientes();

          // Respuesta optimista: la pantalla sigue como si hubiera guardado.
          return new Response(JSON.stringify([]), {
            status: 202,
            headers: { "Content-Type": "application/json", "X-Floema-Encolado": "1" },
          });
        }
      })()
    );
    return;
  }

  if (req.method !== "GET") return;
  if (url.pathname.includes("/auth/") || url.pathname.startsWith("/api/")) return;

  // 1) Archivos con hash: caché primero (son inmutables).
  if (esEstaticoInmutable(url)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copia = res.clone();
              caches.open(SHELL).then((c) => c.put(req, copia));
            }
            return res;
          })
      )
    );
    return;
  }

  // 2) Imágenes y fuentes: de caché, refrescando por detrás.
  if (esMedia(req, url)) {
    event.respondWith(
      caches.open(DATOS).then(async (c) => {
        const hit = await c.match(req);
        const red = fetch(req)
          .then((res) => {
            if (res.ok) c.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || red;
      })
    );
    return;
  }

  // 3) Navegación y lecturas de Supabase: red primero, caché de respaldo.
  if (req.mode === "navigate" || esSupabase(url)) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res.ok) {
            const copia = res.clone();
            const donde = req.mode === "navigate" ? SHELL : DATOS;
            caches.open(donde).then((c) => c.put(req, copia));
          }
          return res;
        } catch {
          const hit = await caches.match(req);
          if (hit) return hit;
          if (req.mode === "navigate") {
            const base = await caches.match("/lab/inventario");
            if (base) return base;
          }
          return new Response(JSON.stringify({ offline: true }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          });
        }
      })()
    );
  }
});
