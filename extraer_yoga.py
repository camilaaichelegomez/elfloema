#!/usr/bin/env python3
"""
Extrae el texto de los libros de yoga a biblioteca-yoga/*.txt.

Es el mismo camino que siguió la biblioteca de cosmética: los libros quedan
como texto plano y de ahí salen las verificaciones. La diferencia con
biblioteca-cientifica/ es que esa se recolecta sola desde PubMed; esta son
libros que Camila ya tiene.

Cómo usarlo:
    1) Deja los archivos en la carpeta libros-yoga/ (PDF, EPUB o DOCX).
    2) python extraer_yoga.py
    3) El texto queda en biblioteca-yoga/<nombre>.txt

Si los bajaste del Drive y quedaron en Descargas:
    python extraer_yoga.py --desde-descargas
Eso los busca ahí por el nombre, los mueve a libros-yoga/ y sigue igual.

El nombre del .txt sale del nombre del archivo, en minúsculas y con guiones,
igual que en biblioteca-formulacion/.

Los libros NO se versionan (libros-yoga/ y biblioteca-yoga/ van al
.gitignore): son material con derechos de autor y se quedan en el computador,
exactamente como los de cosmética.
"""

import re
import shutil
import sys
import unicodedata
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ENTRADA = Path("libros-yoga")
SALIDA = Path("biblioteca-yoga")

# Menos de esto en una página suele ser una portada, una lámina o una página en
# blanco; con muchas seguidas conviene avisar que el PDF quizá sea escaneado.
MINIMO_POR_PAGINA = 120


def nombre_limpio(nombre: str) -> str:
    """De 'Yoga Sequencing (Mark Stephens).pdf' a 'yoga-sequencing-mark-stephens'."""
    base = unicodedata.normalize("NFKD", nombre)
    base = base.encode("ascii", "ignore").decode("ascii").lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return base or "libro"


def de_pdf(ruta: Path) -> str:
    import fitz  # PyMuPDF

    doc = fitz.open(ruta)
    paginas, vacias = [], 0
    for pagina in doc:
        texto = pagina.get_text("text").strip()
        if len(texto) < MINIMO_POR_PAGINA:
            vacias += 1
        paginas.append(texto)
    doc.close()

    if paginas and vacias / len(paginas) > 0.6:
        print(
            f"    ojo: {vacias} de {len(paginas)} páginas salieron casi vacías. "
            "Puede ser un PDF escaneado (imágenes, no texto); ese necesita OCR."
        )
    return "\n\n".join(paginas)


def de_epub(ruta: Path) -> str:
    import zipfile

    from bs4 import BeautifulSoup

    partes = []
    with zipfile.ZipFile(ruta) as z:
        for nombre in sorted(z.namelist()):
            if not nombre.lower().endswith((".xhtml", ".html", ".htm")):
                continue
            sopa = BeautifulSoup(z.read(nombre), "html.parser")
            texto = sopa.get_text("\n").strip()
            if texto:
                partes.append(texto)
    return "\n\n".join(partes)


def de_docx(ruta: Path) -> str:
    import zipfile

    from bs4 import BeautifulSoup

    with zipfile.ZipFile(ruta) as z:
        sopa = BeautifulSoup(z.read("word/document.xml"), "xml")
    return "\n".join(p.get_text(" ").strip() for p in sopa.find_all("w:p"))


LECTORES = {".pdf": de_pdf, ".epub": de_epub, ".docx": de_docx}


DESCARGAS = Path.home() / "Downloads"

# Con esto se reconocen los libros entre los cientos de archivos de Descargas.
PISTAS = ("yoga", "pranayama", "asana", "stephens", "iyengar", "secuencia", "respiracion")


def traer_de_descargas() -> int:
    """Mueve a libros-yoga/ los PDF de Descargas que parezcan libros de yoga."""
    if not DESCARGAS.exists():
        print(f"No encuentro la carpeta de descargas ({DESCARGAS}).")
        return 0
    ENTRADA.mkdir(exist_ok=True)
    traidos = 0
    for archivo in DESCARGAS.iterdir():
        if archivo.suffix.lower() not in LECTORES:
            continue
        if not any(p in archivo.name.lower() for p in PISTAS):
            continue
        destino = ENTRADA / archivo.name
        if destino.exists():
            continue
        try:
            archivo.rename(destino)
        except PermissionError:
            # En Windows, un PDF abierto en un visor no se puede mover, pero sí
            # se puede leer: se copia y el original se queda donde está.
            shutil.copy2(archivo, destino)
            print(f"  (estaba abierto, así que lo copié en vez de moverlo)")
        print(f"  traído de Descargas: {archivo.name}")
        traidos += 1
    if not traidos:
        print("  no había libros de yoga en Descargas")
    return traidos


def main() -> None:
    if "--desde-descargas" in sys.argv:
        traer_de_descargas()

    if not ENTRADA.exists():
        ENTRADA.mkdir()
        print(f"Creé la carpeta {ENTRADA}/. Deja ahí los libros y vuelve a correr esto.")
        return

    archivos = [p for p in sorted(ENTRADA.iterdir()) if p.suffix.lower() in LECTORES]
    if not archivos:
        print(f"No hay libros en {ENTRADA}/. Acepta PDF, EPUB y DOCX.")
        return

    SALIDA.mkdir(exist_ok=True)
    for ruta in archivos:
        destino = SALIDA / f"{nombre_limpio(ruta.stem)}.txt"
        print(f"  {ruta.name}")
        try:
            texto = LECTORES[ruta.suffix.lower()](ruta)
        except Exception as e:  # un libro roto no puede botar a los demás
            print(f"    no se pudo leer: {e}")
            continue

        texto = re.sub(r"\n{3,}", "\n\n", texto).strip()
        if len(texto) < 2000:
            print(f"    salieron solo {len(texto)} caracteres: revísalo antes de usarlo.")
        destino.write_text(texto, encoding="utf-8")
        print(f"    → {destino}  ({len(texto):,} caracteres)".replace(",", "."))

    print(f"\nListo. El texto quedó en {SALIDA}/")


if __name__ == "__main__":
    main()
