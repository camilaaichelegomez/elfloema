#!/usr/bin/env python3
"""
Genera los fondos de las dos apps de cuerpo con Gemini.

Cada app tenía el mismo fondo (/fondo_belleza.jpg), que además es de la
sección de belleza. Acá se le da uno propio a cada una.

Lo que manda el estilo de la casa: verde muy oscuro casi negro, dorado
envejecido, luz lateral, nada de texto ni personas. Encima el sitio pone un
velo oscuro (el degradado de .ritual-bg), así que la imagen tiene que ser
oscura de origen: si sale clara, el velo la apaga y queda barrosa.

    python generar_fondos.py            # genera los dos
    python generar_fondos.py yoga       # solo uno
"""

import base64
import json
import os
import sys
import urllib.request
from pathlib import Path

# En orden: primero el bueno, y si la cuota está agotada (429) se cae al
# siguiente. Con la clave gratuita el grande suele estar copado.
MODELOS = ["gemini-3-pro-image", "gemini-3.1-flash-image", "gemini-2.5-flash-image"]
URL = "https://generativelanguage.googleapis.com/v1beta/models/{modelo}:generateContent"

COMUN = (
    "Fotografía cenital, estilo claroscuro, luz lateral tenue y cálida de una ventana. "
    "Paleta verde muy oscuro casi negro con acentos dorados envejecidos y madera antigua. "
    "Composición con mucho espacio vacío oscuro. Grano fino de película. "
    "Sin texto, sin letras, sin personas, sin manos, sin rostros, sin logotipos."
)

FONDOS = {
    "facial": {
        "archivo": "public/fondo_ritual_facial.jpg",
        "prompt": (
            "Mesa de madera oscura con elementos de cuidado facial botánico: una piedra gua sha "
            "de jade verde, un rodillo de jade, un frasco de vidrio ámbar con aceite y su gotario, "
            "unas hojas frescas de laurel y flores secas de caléndula sueltas, un paño de lino crudo. "
            "Los objetos agrupados hacia abajo a la izquierda, el resto mesa vacía en penumbra. "
            + COMUN
        ),
    },
    "yoga": {
        "archivo": "public/fondo_yoga.jpg",
        "prompt": (
            "Rincón de práctica en penumbra al amanecer: un mat de yoga enrollado sobre piso de "
            "madera oscura, una manta de lana doblada, un cojín firme y dos bloques de corcho "
            "apilados, y a un costado una planta grande de hojas verdes. Un haz de luz suave entra "
            "por una ventana alta y cruza el suelo, con polvo flotando. El rincón hacia la derecha, "
            "el resto suelo vacío en penumbra. " + COMUN
        ),
    },
}


def clave() -> str:
    for linea in Path(".env.local").read_text(encoding="utf-8").splitlines():
        if linea.startswith("GEMINI_API_KEY="):
            return linea.split("=", 1)[1].strip()
    raise SystemExit("No encontré GEMINI_API_KEY en .env.local")


def generar(nombre: str, ficha: dict, api_key: str) -> None:
    cuerpo = {
        "contents": [{"parts": [{"text": ficha["prompt"]}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": "16:9"},
        },
    }
    datos = None
    for modelo in MODELOS:
        peticion = urllib.request.Request(
            URL.format(modelo=modelo) + f"?key={api_key}",
            data=json.dumps(cuerpo).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        print(f"  {nombre}: pidiendo imagen a {modelo}…")
        try:
            with urllib.request.urlopen(peticion, timeout=300) as r:
                datos = json.load(r)
            break
        except urllib.error.HTTPError as e:
            if e.code in (429, 404):
                print(f"    {modelo} no disponible ({e.code}), pruebo el siguiente")
                continue
            raise
    if datos is None:
        raise SystemExit(f"  {nombre}: ningún modelo de imagen disponible ahora")

    partes = datos["candidates"][0]["content"]["parts"]
    imagen = next((p["inlineData"]["data"] for p in partes if "inlineData" in p), None)
    if not imagen:
        raise SystemExit(f"  {nombre}: la respuesta no traía imagen: {json.dumps(datos)[:300]}")

    destino = Path(ficha["archivo"])
    destino.write_bytes(base64.b64decode(imagen))
    print(f"  {nombre}: → {destino} ({destino.stat().st_size // 1024} KB)")


def main() -> None:
    api_key = clave()
    pedidos = sys.argv[1:] or list(FONDOS)
    for nombre in pedidos:
        if nombre not in FONDOS:
            print(f"No conozco el fondo «{nombre}». Hay: {', '.join(FONDOS)}")
            continue
        generar(nombre, FONDOS[nombre], api_key)


if __name__ == "__main__":
    os.chdir(Path(__file__).parent)
    main()
