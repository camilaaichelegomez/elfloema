# Imágenes de la sección Hipopresivos

Son **13 posturas y 2 fondos**. Las posturas son las de la lámina de posturas
hipopresivas (Low Pressure Fitness), con sus nombres. La mejor forma de que
el dibujo salga fiel es **recortar cada figura de la lámina** y dársela a la
IA como foto de referencia.

## Cómo hacer cada postura

1. Recorta de la lámina la figura de la postura (una sola figura por imagen).
2. Súbela a la IA y pega el prompt de abajo, tal cual.
3. Guarda el resultado con el nombre de la tabla: `venus.png`, `atenea.png`…
   Sirven png, jpg o webp; no hay que convertir nada.
4. Súbelas a la carpeta `public/hipopresivos/` (en GitHub: Add file → Upload
   files → Commit changes).

En cuanto el archivo existe, el dibujo **aparece solo** en la app.

## Los nombres

| Archivo | Postura | Nivel en la app |
|---|---|---|
| `venus` | Venus: de pie, brazos hacia abajo y a los lados | Empezando |
| `atenea` | Atenea: de pie, codos abiertos, manos delante de la pelvis | Empezando |
| `artemisa` | Artemisa: de pie, doblada hacia adelante | Empezando |
| `aura` | Aura: de rodillas, brazos al frente | Empezando |
| `maya` | Maya: en cuatro apoyos | Empezando |
| `gaia` | Gaia: en cuatro apoyos, espalda redondeada | Empezando |
| `hestia` | Hestia: sentada, piernas estiradas, brazos al frente | Empezando |
| `demeter` | Deméter: acostada boca arriba, brazos arriba | Empezando |
| `freya` | Freya: de pie, brazos arriba | Ya me sale |
| `persefone` | Perséfone: estocada | Ya me sale |
| `isis` | Isis: de rodillas, inclinada con los brazos adelante | Ya me sale |
| `selene` | Selene: acostada, brazos estirados sobre la cabeza | Ya me sale |
| `afrodita` | Afrodita: acostada, cadera arriba, brazos sobre la cabeza | Con práctica |

Todo en minúscula y sin tildes (`demeter`, `persefone`).

## El prompt (el mismo para todas)

```
Redraw the exact body pose from the attached image — same position of the arms, elbows, wrists, hands, legs and hips, same camera angle — as a flat vector illustration. A single adult woman drawn in solid warm gold and tan, two flat tones only: light gold for the near arm and leg, darker bronze for the far arm and leg. No outlines, no gradients, no shading, no muscle definition. Simple hair bun, no facial features. Very dark forest-green background (#0d1a0d). Pale sage-green exercise mat under her wherever she touches the floor. Whole body visible from head to feet, generous empty margin all around, horizontal 4:3 composition. Do not copy the person, the clothes, the labels or the numbers from the image: only the pose. Absolutely no text, letters, numbers, arrows or watermark.
```

Si ya tienes un dibujo que salió bien, súbelo también y agrega al final:
*"Match the style of the second attached illustration exactly."* Así todas
quedan iguales.

---

## Los dos fondos

Mismo estilo fotográfico de los otros fondos del sitio: sin gente, luz suave.

### `fondo_hipopresivos.webp` — Fondo de la biblioteca

Va en `public/`. Formato **horizontal panorámico** (1380×780 aprox.).

```
A quiet, empty room in dim natural light, deep dark green walls, worn wooden floor, tall window on the left with soft warm morning sunbeams crossing the room through a faint haze. On the floor: an unrolled pale linen exercise mat with a small folded blanket and a round meditation cushion, a simple wooden chair beside it. A few potted ferns and a trailing plant in old terracotta pots against the wall, a glass of water on the windowsill. Calm, spacious, breathing feeling. Cinematic, moody, muted earthy palette of dark greens, warm bronze and soft cream, shallow depth of field, photographic, atmospheric. No people, no text, no letters, no numbers, no logos, no watermark.
```

### `fondo_hipopresivos_app.webp` — Fondo de la app

Va en `public/`. Formato **vertical** (1080×1920 aprox.), porque se ve sobre
todo en el teléfono. Tiene que ser oscuro y tranquilo: encima va la práctica.

```
Vertical composition. Looking up through a calm dark forest at dawn: tall slender tree trunks, soft mist between them, a few thin rays of warm golden light falling from above into the center, ferns in the lower foreground in deep shadow. Very dark, calm and airy, lots of empty dark space in the middle of the image. Muted palette of deep forest green, black-green and warm gold. Photographic, atmospheric, soft focus. No people, no text, no letters, no numbers, no logos, no watermark.
```
