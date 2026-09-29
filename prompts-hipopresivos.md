# Prompts para las imágenes de la sección Hipopresivos

Son 8 posturas y 2 fondos. El estilo de las posturas es **el mismo de Fuerza y
de las posturas de yoga**: figura plana dorada sobre verde muy oscuro. Así las
secciones se ven de la misma app.

## Cómo se usan

1. Copia **el estilo base** y pégalo al final de cada prompt de postura.
2. Genera la imagen. Tamaño: **horizontal 4:3** (800×600 va perfecto).
3. Guárdala con **el nombre exacto de la primera columna** (sin tildes, con
   guiones bajos) dentro de `public/hipopresivos/`.
4. Si la guardas en otro formato (png, jpg), déjalas todas en una carpeta y
   me dices: yo las convierto a webp y las dejo en su sitio.

La app ya está preparada: **en cuanto el archivo existe, el dibujo aparece
solo**, en la práctica y en la lista de posturas. Mientras no exista, no se ve
nada roto.

**Lo más importante de todas:** la cintura tiene que verse **hundida hacia
adentro** y las costillas **abiertas hacia los lados**, que es el gesto de la
pausa. Si la IA dibuja la guata inflada o un abdomen marcado, vuelve a
generarla agregando: *"the belly is drawn deeply hollowed in under the ribs"*.

---

## El estilo base (pégalo al final de cada prompt)

```
Flat vector illustration. A single adult woman drawn in solid warm gold and
tan, two flat tones only: light gold for the near arm and leg, darker bronze
for the far arm and leg. No outlines, no gradients, no shading, no muscle
definition. Simple hair bun, no facial features. Very dark forest-green
background (#0d1a0d). Any prop (chair, cushion) drawn as a simple flat shape in
muted sage green or dull bronze, clearly simpler than the figure. Pale
sage-green exercise mat under her wherever she touches the floor. Whole body
visible from head to feet, generous empty margin all around, horizontal 4:3
composition. Her rib cage is visibly expanded wide to the sides and her belly
is hollowed deeply inward and upward under the ribs, as in a hypopressive
breath-hold. VERY IMPORTANT: absolutely no text, no letters, no words, no
numbers, no arrows, no labels and no watermark anywhere in the image.
```

---

## Las posturas

| Archivo | Prompt (+ estilo base) |
|---|---|
| `acostada` | Side view. Lying on her back on the mat, knees bent and feet flat on the floor hip-width apart, arms resting slightly away from the body with palms up, neck long with the chin slightly tucked, lower back resting on the mat. |
| `sentada` | Three-quarter view from the front. Sitting tall on the front edge of a simple chair, back straight and not touching the backrest, feet flat on the floor, hands resting on the thighs with elbows opened out to the sides, shoulders relaxed down away from the ears. |
| `de_pie` | Side view. Standing with feet parallel and hip-width apart, knees softly bent, the whole body leaning slightly forward in one straight line so the weight is over the balls of the feet, heels still on the floor, arms hanging at the sides with elbows slightly bent and opened out, hands at hip level. |
| `de_pie_brazos` | Three-quarter view from the front. Standing, knees softly bent, body leaning slightly forward, both arms reaching forward at navel height with elbows opened out wide and fingertips pointing toward each other, palms pushing gently forward, shoulders low. |
| `cuadrupedia` | Side view. On hands and knees on the mat: hands under the shoulders, knees under the hips, back perfectly flat like a table from the crown of the head to the tailbone, elbows slightly bent and opened out, gaze to the floor. |
| `de_rodillas` | Side view. Kneeling upright on the mat with knees hip-width apart, the whole trunk tilted slightly forward in one straight line from the knees to the head, arms at the sides with elbows opened out, hands at waist height. |
| `inclinada` | Side view. Standing with knees bent, hinging forward at the hips with a long straight back at about 45 degrees, both hands resting on the thighs just above the knees, elbows opened out to the sides, neck long in line with the spine. |
| `semisentadilla` | Three-quarter view from the front. Half squat with feet hip-width apart, hips pushed back as if about to sit on a high stool, trunk leaning forward with a long straight back, both arms reaching forward at chest height with elbows opened out, knees tracking over the toes. |

---

## Los dos fondos

Mismo estilo fotográfico de los otros fondos del sitio: una habitación en
penumbra, luz de ventana, sin gente.

### Biblioteca: `public/fondo_hipopresivos.webp`

Formato **horizontal panorámico** (1380×780 aprox.).

```
A quiet, empty room in dim natural light, deep dark green walls, worn wooden
floor, tall window on the left with soft warm morning sunbeams crossing the
room through a faint haze. On the floor: an unrolled pale linen exercise mat
with a small folded blanket and a round meditation cushion, a simple wooden
chair beside it. A few potted ferns and a trailing plant in old terracotta
pots against the wall, a glass of water on the windowsill. Calm, spacious,
breathing feeling. Cinematic, moody, muted earthy palette of dark greens, warm
bronze and soft cream, shallow depth of field, photographic, atmospheric. No
people, no text, no letters, no numbers, no logos, no watermark.
```

### App: `public/fondo_hipopresivos_app.webp`

Formato **vertical** (1080×1920 aprox.), porque se ve sobre todo en el
teléfono. Tiene que ser oscuro y tranquilo: encima va la práctica.

```
Vertical composition. Looking up through a calm dark forest at dawn: tall
slender tree trunks, soft mist between them, a few thin rays of warm golden
light falling from above into the center, ferns in the lower foreground in
deep shadow. Very dark, calm and airy, lots of empty dark space in the middle
of the image. Muted palette of deep forest green, black-green and warm gold.
Photographic, atmospheric, soft focus. No people, no text, no letters, no
numbers, no logos, no watermark.
```
