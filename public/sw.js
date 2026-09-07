/* Service worker de El Floema Lab.
   Antes solo reenviaba a la red (event.respondWith(fetch(...))), o sea que la
   app NO funcionaba sin conexión pese a ser instalable. Ahora guarda en caché.

   Estrategias:
   - Navegación  → red primero, caché de respaldo (así ves lo último que abriste
                   cuando no hay señal, pero siempre datos frescos si hay red).
   - /_next/static → caché primero (llevan hash en el nombre: nunca cambian).
   - Imágenes/fuentes → se sirve de caché y se actualiza en segundo plano.
   - Supabase (GET) → red primero, caché de respaldo: en el taller sin señal
                   ves el último inventario/fórmulas que cargaste.
   - Todo lo que no sea GET (guardar, borrar, login) → siempre red, nunca caché.
*/

const VERSION = "floema-lab-v2";
const SHELL = `${VERSION}-shell`;
const DATOS = `${VERSION}-datos`;

const RUTAS_BASE = ["/lab", "/lab/inventario", "/lab/formulas", "/lab/preparadas"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL).then((c) => c.addAll(RUTAS_BASE).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Borra cachés de versiones anteriores.
      const nombres = await caches.keys();
      await Promise.all(
        nombres.filter((n) => !n.startsWith(VERSION)).map((n) => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

function esEstaticoInmutable(url) {
  return url.pathname.startsWith("/_next/static/");
}

function esMedia(req, url) {
  return (
    req.destination === "image" ||
    req.destination === "font" ||
    /\.(jpg|jpeg|png|webp|avif|svg|woff2?)$/i.test(url.pathname)
  );
}

function esSupabase(url) {
  return url.hostname.endsWith(".supabase.co");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Guardar/borrar/iniciar sesión: siempre a la red, sin tocar caché.
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Nunca cachear autenticación.
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

  // 2) Imágenes y fuentes: se muestran de caché y se refrescan por detrás.
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

  // 3) Navegación y datos de Supabase: red primero, caché de respaldo.
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
          return new Response(
            JSON.stringify({ offline: true, mensaje: "Sin conexión y sin copia guardada." }),
            { status: 503, headers: { "Content-Type": "application/json" } }
          );
        }
      })()
    );
  }
});
