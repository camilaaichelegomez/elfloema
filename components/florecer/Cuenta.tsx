"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-browser";
import {
  olvidarEstadoDeSincronia,
  recargarSiHaceFalta,
  sincronizar,
  type Resultado,
} from "@/lib/florecer/sincronizar";

/* La cuenta de Florecer.

   La app funciona sin cuenta: todo vive en el navegador. La cuenta sirve
   para una sola cosa, y conviene decirlo así de claro: que lo tuyo te siga
   del teléfono al computador y no se pierda si cambias de aparato.

   Se puede entrar de dos formas, porque las dos molestan a gente distinta:
   con contraseña, o con un enlace que llega al correo y no hay que recordar
   nada. La de la contraseña es la misma cuenta del Lab, así que quien ya
   tenga una entra con esa.

   Al entrar, lo que hay en este aparato se sube; si en la nube había algo
   más nuevo, baja y la página se recarga una vez para mostrarlo. */

type Sesion = { email: string | null } | null;

export function Cuenta() {
  const [sesion, setSesion] = useState<Sesion>(null);
  const [cargando, setCargando] = useState(true);
  const [abierto, setAbierto] = useState(false);
  const [modo, setModo] = useState<"enlace" | "clave">("enlace");
  const [registrando, setRegistrando] = useState(false);
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [trabajando, setTrabajando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [estado, setEstado] = useState<Resultado | null>(null);
  const yaSincronizado = useRef(false);
  /* El oyente de «volvió a la pantalla» se registra una sola vez, así que
     mira la sesión por referencia y no por la variable de ese render. */
  const sesionRef = useRef<Sesion>(null);

  useEffect(() => {
    sesionRef.current = sesion;
  }, [sesion]);

  const correrSincronia = useCallback(async () => {
    const r = await sincronizar();
    setEstado(r);
    recargarSiHaceFalta(r);
    return r;
  }, []);

  useEffect(() => {
    const supabase = createClient();
    let vivo = true;

    (async () => {
      // El enlace del correo vuelve con un código en la dirección.
      const params = new URLSearchParams(window.location.search);
      const codigo = params.get("code");
      if (codigo) {
        try {
          await supabase.auth.exchangeCodeForSession(codigo);
          history.replaceState(null, "", window.location.pathname);
        } catch {
          /* enlace vencido o ya usado: se muestra el formulario igual */
        }
      }

      const { data } = await supabase.auth.getUser();
      if (!vivo) return;
      setSesion(data.user ? { email: data.user.email ?? null } : null);
      setCargando(false);
      if (data.user && !yaSincronizado.current) {
        yaSincronizado.current = true;
        void correrSincronia();
      }
    })();

    const { data: escucha } = supabase.auth.onAuthStateChange((_evento, s) => {
      setSesion(s?.user ? { email: s.user.email ?? null } : null);
    });

    // Al volver a la app, se sube lo que se haya hecho mientras tanto.
    const alVolver = () => {
      if (!document.hidden && sesionRef.current) void correrSincronia();
    };
    document.addEventListener("visibilitychange", alVolver);

    return () => {
      vivo = false;
      escucha.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, [correrSincronia]);

  const entrar = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setAviso(null);
    setTrabajando(true);
    const supabase = createClient();

    try {
      if (modo === "enlace") {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { emailRedirectTo: `${window.location.origin}/florecer` },
        });
        if (error) throw error;
        setAviso("Te mandé un enlace al correo. Ábrelo desde este mismo aparato y entras.");
      } else if (registrando) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: clave,
          options: { emailRedirectTo: `${window.location.origin}/florecer` },
        });
        if (error) throw error;
        if (data.session) {
          setAbierto(false);
          await correrSincronia();
        } else {
          setAviso("Cuenta creada. Revisa tu correo para confirmarla y después entra.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: clave,
        });
        if (error) throw error;
        setAbierto(false);
        await correrSincronia();
      }
    } catch (e) {
      setError(traducir(e instanceof Error ? e.message : "No se pudo entrar."));
    } finally {
      setTrabajando(false);
    }
  };

  const salir = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    olvidarEstadoDeSincronia();
    setSesion(null);
    setEstado(null);
    yaSincronizado.current = false;
  };

  if (cargando) return null;

  if (sesion) {
    return (
      <div style={{ ...caja, display: "flex", gap: "0.7rem", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ ...texto, flex: 1, minWidth: 0 }}>
          Guardado en tu cuenta
          {sesion.email ? <span style={{ opacity: 0.6 }}> · {sesion.email}</span> : null}
          {estado?.error && (
            <span style={{ display: "block", color: "#dd9464", fontSize: "0.85rem" }}>
              No se pudo guardar en la nube: {estado.error}
            </span>
          )}
        </span>
        <button type="button" onClick={() => void correrSincronia()} style={enlace}>
          Sincronizar ahora
        </button>
        <button type="button" onClick={() => void salir()} style={enlace}>
          Salir
        </button>
      </div>
    );
  }

  if (!abierto) {
    return (
      <div style={{ ...caja, display: "flex", gap: "0.7rem", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ ...texto, flex: 1, minWidth: 0 }}>
          Lo tuyo se guarda en este aparato. Con una cuenta, te sigue al teléfono y al computador.
        </span>
        <button type="button" onClick={() => setAbierto(true)} style={boton}>
          Entrar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={entrar} style={{ ...caja, display: "grid", gap: "0.7rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {(
          [
            ["enlace", "Con un enlace al correo"],
            ["clave", "Con contraseña"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setModo(id);
              setError(null);
              setAviso(null);
            }}
            aria-pressed={modo === id}
            style={{
              ...boton,
              background: modo === id ? "rgba(200,160,80,0.18)" : "transparent",
              color: modo === id ? "#e8c878" : "#c8a050",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <label style={{ display: "grid", gap: "0.3rem" }}>
        <span style={rotulo}>Tu correo</span>
        <input
          id="florecer-correo"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={campo}
        />
      </label>

      {modo === "clave" && (
        <label style={{ display: "grid", gap: "0.3rem" }}>
          <span style={rotulo}>Contraseña</span>
          <input
            id="florecer-clave"
            type="password"
            autoComplete={registrando ? "new-password" : "current-password"}
            required
            minLength={6}
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            style={campo}
          />
        </label>
      )}

      {error && <p style={{ ...texto, color: "#dd9464", margin: 0 }}>{error}</p>}
      {aviso && <p style={{ ...texto, color: "#a8c88a", margin: 0 }}>{aviso}</p>}

      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
        <button type="submit" disabled={trabajando} style={{ ...boton, opacity: trabajando ? 0.6 : 1 }}>
          {trabajando
            ? "Un momento…"
            : modo === "enlace"
              ? "Mandarme el enlace"
              : registrando
                ? "Crear cuenta"
                : "Entrar"}
        </button>
        {modo === "clave" && (
          <button type="button" onClick={() => setRegistrando((v) => !v)} style={enlace}>
            {registrando ? "Ya tengo cuenta" : "Crear una cuenta"}
          </button>
        )}
        <button type="button" onClick={() => setAbierto(false)} style={enlace}>
          Ahora no
        </button>
      </div>

      <p style={{ ...texto, fontSize: "0.85rem", opacity: 0.7, margin: 0 }}>
        Es la misma cuenta del Lab. Si ya tienes una, entra con esa.
      </p>
    </form>
  );
}

function traducir(mensaje: string) {
  if (mensaje.includes("Invalid login credentials")) return "Correo o contraseña incorrectos.";
  if (mensaje.includes("User already registered")) return "Ya existe una cuenta con ese correo.";
  if (mensaje.includes("Password should be at least")) return "La contraseña necesita al menos 6 caracteres.";
  if (mensaje.includes("Unable to validate email address")) return "Ese correo no parece válido.";
  if (mensaje.includes("For security purposes")) return "Espera un momento antes de volver a pedirlo.";
  if (mensaje.toLowerCase().includes("failed to fetch")) return "Sin conexión. La app sigue funcionando igual.";
  return mensaje;
}

const caja: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(12,22,12,0.72)",
  borderRadius: 8,
  padding: "0.85rem 1rem",
};

const texto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.95rem",
  lineHeight: 1.5,
  color: "#d9cbaa",
  margin: 0,
};

const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.7)",
};

const campo: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  color: "#e6dcc3",
  background: "rgba(10,18,10,0.6)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 5,
  padding: "0.55rem 0.7rem",
  width: "100%",
  minHeight: 44,
};

const boton: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c8a050",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
  borderRadius: 4,
  padding: "0 1rem",
  minHeight: 42,
  cursor: "pointer",
};

const enlace: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.88rem",
  color: "rgba(200,160,80,0.8)",
  background: "none",
  border: "none",
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  padding: "0.3rem 0.2rem",
};
