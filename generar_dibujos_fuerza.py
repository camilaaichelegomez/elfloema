"""
Genera los dibujos de los ejercicios de la sección Fuerza con Gemini
(nano banana / gemini-2.5-flash-image) y los deja en public/fuerza/<figura>.webp.

Los prompts NO se escriben acá: se leen de prompts-fuerza.md, que es el único
sitio donde viven. Si cambias un prompt ahí, este script genera el nuevo.

Cada imagen se recorta a 4:3, se baja a 800x600 y se guarda en webp, que es lo
que la app pide. Salta las que ya existen, salvo que se pida --forzar.

Lee GEMINI_API_KEY de .env.local.

Uso:
    py -3 generar_dibujos_fuerza.py --listar
    py -3 generar_dibujos_fuerza.py --solo flexion_pared sentadilla_silla
    py -3 generar_dibujos_fuerza.py --limit 6      # las primeras 6 que falten
    py -3 generar_dibujos_fuerza.py                # todas las que falten
"""

import argparse
import base64
import io
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).parent
DOC = RAIZ / "prompts-fuerza.md"
SALIDA = RAIZ / "public" / "fuerza"
ENV = RAIZ / ".env.local"
MODELO = "gemini-2.5-flash-image"
ANCHO, ALTO = 800, 600

# El fondo de la biblioteca no es un ejercicio y no va a la misma carpeta.
APARTE = {"fondo_fuerza"}


def leer_api_key() -> str:
    if not ENV.exists():
        sys.exit(f"No se encontró {ENV}")
    for linea in ENV.read_text(encoding="utf-8").splitlines():
        if linea.startswith("GEMINI_API_KEY="):
            return linea.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("No se encontró GEMINI_API_KEY en .env.local")


def leer_prompts() -> list[dict]:
    """Mismo formato que lee la página de taller: ### `archivo.webp` + bloque."""
    if not DOC.exists():
        sys.exit(f"No se encontró {DOC}")
    lineas = DOC.read_text(encoding="utf-8").replace("\r\n", "\n").split("\n")
    salida, grupo = [], ""
    for i, l in enumerate(lineas):
        en_grupo = re.match(r"^## (.+)$", l)
        if en_grupo:
            grupo = en_grupo.group(1).strip()
            continue
        en_titulo = re.match(r"^### `([a-z0-9_]+)\.webp`(?:\s+—\s+(.*))?$", l)
        if not en_titulo:
            continue
        j = i + 1
        while j < len(lineas) and lineas[j].strip() != "```":
            j += 1
        if j >= len(lineas):
            continue
        cuerpo = []
        j += 1
        while j < len(lineas) and lineas[j].strip() != "```":
            cuerpo.append(lineas[j])
            j += 1
        salida.append(
            {
                "grupo": grupo,
                "archivo": en_titulo.group(1),
                "nombre": (en_titulo.group(2) or en_titulo.group(1)).strip(),
                "prompt": "\n".join(cuerpo).strip(),
            }
        )
    return salida


def generar_imagen(prompt: str, api_key: str) -> bytes | None:
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODELO}:generateContent?key={api_key}"
    )
    cuerpo = json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode("utf-8")
    req = urllib.request.Request(url, data=cuerpo, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            datos = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"    HTTP {e.code}: {e.read().decode('utf-8', 'ignore')[:300]}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"    Error: {e}", file=sys.stderr)
        return None

    for cand in datos.get("candidates", []):
        for parte in cand.get("content", {}).get("parts", []):
            inline = parte.get("inlineData") or parte.get("inline_data")
            if inline and inline.get("data"):
                return base64.b64decode(inline["data"])
    print(f"    Sin imagen en la respuesta: {json.dumps(datos)[:300]}", file=sys.stderr)
    return None


def a_webp(bruto: bytes, destino: Path) -> None:
    """Recorta al centro en 4:3, baja a 800x600 y guarda en webp."""
    from PIL import Image

    im = Image.open(io.BytesIO(bruto)).convert("RGB")
    objetivo = ANCHO / ALTO
    ancho, alto = im.size
    actual = ancho / alto
    if actual > objetivo:  # demasiado ancha: se recorta a los lados
        nuevo = int(alto * objetivo)
        izq = (ancho - nuevo) // 2
        im = im.crop((izq, 0, izq + nuevo, alto))
    elif actual < objetivo:  # demasiado alta: se recorta arriba y abajo
        nuevo = int(ancho / objetivo)
        arr = (alto - nuevo) // 2
        im = im.crop((0, arr, ancho, arr + nuevo))
    im = im.resize((ANCHO, ALTO), Image.LANCZOS)
    im.save(destino, "WEBP", quality=82, method=6)


def main() -> None:
    ap = argparse.ArgumentParser(description="Genera los dibujos de los ejercicios con Gemini.")
    ap.add_argument("--solo", nargs="+", metavar="FIGURA", help="Solo estos (ej: flexion_pared)")
    ap.add_argument("--limit", type=int, default=None, help="Máximo a generar en esta pasada")
    ap.add_argument("--forzar", action="store_true", help="Regenerar aunque ya exista")
    ap.add_argument("--listar", action="store_true", help="Solo listar y salir")
    ap.add_argument("--fondo", action="store_true", help="Generar también el fondo de la biblioteca")
    args = ap.parse_args()

    todos = leer_prompts()
    print(f"Prompts en el documento: {len(todos)}")

    if args.listar:
        for p in todos:
            existe = "✓" if (SALIDA / f"{p['archivo']}.webp").exists() else " "
            print(f"  {existe} {p['archivo']:26} {p['nombre']}")
        return

    cola = [p for p in todos if args.fondo or p["archivo"] not in APARTE]
    if args.solo:
        pedidos = set(args.solo)
        cola = [p for p in cola if p["archivo"] in pedidos]
        desconocidos = pedidos - {p["archivo"] for p in cola}
        if desconocidos:
            sys.exit(f"No existen en el documento: {sorted(desconocidos)}")
    if not args.forzar:
        cola = [p for p in cola if not (SALIDA / f"{p['archivo']}.webp").exists()]
    if args.limit:
        cola = cola[: args.limit]

    if not cola:
        print("No hay nada que generar.")
        return

    SALIDA.mkdir(parents=True, exist_ok=True)
    api_key = leer_api_key()
    print(f"A generar: {len(cola)}\n")

    hechas, fallidas = 0, []
    for i, p in enumerate(cola, 1):
        # El fondo de la biblioteca es panorámico y va en public/, no acá.
        aparte = p["archivo"] in APARTE
        destino = (RAIZ / "public" / f"{p['archivo']}.webp") if aparte else SALIDA / f"{p['archivo']}.webp"
        print(f"[{i}/{len(cola)}] {p['archivo']} — {p['nombre']}")
        bruto = generar_imagen(p["prompt"], api_key)
        if not bruto:
            fallidas.append(p["archivo"])
            continue
        try:
            if aparte:
                from PIL import Image

                Image.open(io.BytesIO(bruto)).convert("RGB").save(destino, "WEBP", quality=82, method=6)
            else:
                a_webp(bruto, destino)
        except Exception as e:
            print(f"    No se pudo convertir: {e}", file=sys.stderr)
            fallidas.append(p["archivo"])
            continue
        print(f"    → {destino.relative_to(RAIZ)}")
        hechas += 1
        time.sleep(1.5)  # no atropellar la API

    print(f"\nListas: {hechas}")
    if fallidas:
        print(f"Fallaron ({len(fallidas)}): {', '.join(fallidas)}")
        print("Vuelve a correr el script y solo intentará esas.")


if __name__ == "__main__":
    main()
