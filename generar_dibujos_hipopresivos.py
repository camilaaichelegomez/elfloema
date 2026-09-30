"""
Genera los dibujos de las posturas de Hipopresivos con Gemini
(nano banana / gemini-2.5-flash-image) y los deja en
public/hipopresivos/<postura>.webp.

A diferencia de los de Fuerza, cada dibujo se pide con DOS imágenes además
del prompt: la figura de la lámina (la postura) y uno de los dibujos que ya
quedaron bien (el estilo). Con solo palabras la IA inventa la postura.

Los prompts y qué imágenes adjuntar se leen de prompts-hipopresivos.md:

    ### `artemisa` — Artemisa: ...
    Adjunta: `referencias-hipopresivos/artemisa.jpg` + `public/hipopresivos/atenea.webp`
    ```
    prompt
    ```

Las figuras de la lámina van en referencias-hipopresivos/ (no se suben a
GitHub: son fotos de la lámina, no nuestras).

Lee GEMINI_API_KEY de .env.local.

Uso:
    py -3 generar_dibujos_hipopresivos.py --listar
    py -3 generar_dibujos_hipopresivos.py --solo artemisa aura
    py -3 generar_dibujos_hipopresivos.py            # todas las que falten
    py -3 generar_dibujos_hipopresivos.py --solo gaia --forzar
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
DOC = RAIZ / "prompts-hipopresivos.md"
SALIDA = RAIZ / "public" / "hipopresivos"
ENV = RAIZ / ".env.local"
MODELO = "gemini-2.5-flash-image"
ANCHO, ALTO = 800, 600
FORMATOS = ("webp", "png", "jpg", "jpeg")
TIPOS = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp"}


def leer_api_key() -> str:
    if not ENV.exists():
        sys.exit(f"No se encontró {ENV}")
    for linea in ENV.read_text(encoding="utf-8").splitlines():
        if linea.startswith("GEMINI_API_KEY="):
            return linea.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("No se encontró GEMINI_API_KEY en .env.local")


def leer_prompts() -> list[dict]:
    if not DOC.exists():
        sys.exit(f"No se encontró {DOC}")
    lineas = DOC.read_text(encoding="utf-8").replace("\r\n", "\n").split("\n")
    salida = []
    for i, l in enumerate(lineas):
        titulo = re.match(r"^### `([a-z0-9_]+)`(?:\s+—\s+(.*))?$", l)
        if not titulo:
            continue
        adjuntos, j = [], i + 1
        while j < len(lineas) and lineas[j].strip() != "```":
            if lineas[j].startswith("Adjunta:"):
                adjuntos = re.findall(r"`([^`]+)`", lineas[j])
            j += 1
        if j >= len(lineas) or not adjuntos:
            continue
        cuerpo = []
        j += 1
        while j < len(lineas) and lineas[j].strip() != "```":
            cuerpo.append(lineas[j])
            j += 1
        salida.append(
            {
                "archivo": titulo.group(1),
                "nombre": (titulo.group(2) or titulo.group(1)).strip(),
                "adjuntos": [RAIZ / a for a in adjuntos],
                "prompt": "\n".join(cuerpo).strip(),
            }
        )
    return salida


def ya_existe(archivo: str) -> bool:
    return any((SALIDA / f"{archivo}.{f}").exists() for f in FORMATOS)


def generar_imagen(prompt: str, adjuntos: list[Path], api_key: str) -> bytes | None:
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODELO}:generateContent?key={api_key}"
    )
    partes = [
        {"inline_data": {"mime_type": TIPOS[a.suffix.lower()], "data": base64.b64encode(a.read_bytes()).decode()}}
        for a in adjuntos
    ]
    partes.append({"text": prompt})
    cuerpo = json.dumps(
        {
            "contents": [{"parts": partes}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "4:3"}},
        }
    ).encode("utf-8")
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
    if ancho / alto > objetivo:
        nuevo = int(alto * objetivo)
        izq = (ancho - nuevo) // 2
        im = im.crop((izq, 0, izq + nuevo, alto))
    elif ancho / alto < objetivo:
        nuevo = int(ancho / objetivo)
        arr = (alto - nuevo) // 2
        im = im.crop((0, arr, ancho, arr + nuevo))
    im = im.resize((ANCHO, ALTO), Image.LANCZOS)
    im.save(destino, "WEBP", quality=82, method=6)


def main() -> None:
    ap = argparse.ArgumentParser(description="Genera los dibujos de Hipopresivos con Gemini.")
    ap.add_argument("--solo", nargs="+", metavar="POSTURA", help="Solo estas (ej: artemisa aura)")
    ap.add_argument("--forzar", action="store_true", help="Regenerar aunque ya exista")
    ap.add_argument("--listar", action="store_true", help="Solo listar y salir")
    args = ap.parse_args()

    todos = leer_prompts()
    print(f"Posturas en el documento: {len(todos)}")

    if args.listar:
        for p in todos:
            marca = "✓" if ya_existe(p["archivo"]) else " "
            print(f"  {marca} {p['archivo']:12} {p['nombre']}")
        return

    cola = todos
    if args.solo:
        pedidas = set(args.solo)
        cola = [p for p in cola if p["archivo"] in pedidas]
        desconocidas = pedidas - {p["archivo"] for p in cola}
        if desconocidas:
            sys.exit(f"No están en el documento: {sorted(desconocidas)}")
    if not args.forzar:
        cola = [p for p in cola if not ya_existe(p["archivo"])]
    if not cola:
        print("No hay nada que generar.")
        return

    faltan = [str(a.relative_to(RAIZ)) for p in cola for a in p["adjuntos"] if not a.exists()]
    if faltan:
        sys.exit("Faltan estas imágenes de referencia:\n  " + "\n  ".join(sorted(set(faltan))))

    api_key = leer_api_key()
    print(f"A generar: {len(cola)}\n")
    hechas, fallidas = 0, []
    for i, p in enumerate(cola, 1):
        destino = SALIDA / f"{p['archivo']}.webp"
        print(f"[{i}/{len(cola)}] {p['archivo']} — {p['nombre']}")
        bruto = generar_imagen(p["prompt"], p["adjuntos"], api_key)
        if not bruto:
            fallidas.append(p["archivo"])
            continue
        try:
            a_webp(bruto, destino)
        except Exception as e:
            print(f"    No se pudo convertir: {e}", file=sys.stderr)
            fallidas.append(p["archivo"])
            continue
        print(f"    → {destino.relative_to(RAIZ)}")
        hechas += 1
        time.sleep(1.5)

    print(f"\nListas: {hechas}")
    if fallidas:
        print(f"Fallaron ({len(fallidas)}): {', '.join(fallidas)}")
        print("Vuelve a correr el script y solo intentará esas.")
    print("Míralas antes de subirlas: si una salió con la postura mal, bórrala y corre de nuevo.")


if __name__ == "__main__":
    main()
