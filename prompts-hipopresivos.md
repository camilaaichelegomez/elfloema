# Imágenes de la sección Hipopresivos

Son **14 posturas y 2 fondos**. Las posturas son las de la lámina de posturas
hipopresivas (Low Pressure Fitness), con sus nombres. Ya están 5; faltan 9.
Lo que mejor funciona es darle a la IA **dos imágenes**: la figura de la
lámina (la postura) y uno de tus dibujos buenos (el estilo), más un prompt
que describe la postura con palabras.

## Cómo hacer cada postura

Las que faltan son **9**. Para cada una:

1. **Primera imagen:** el maniquí de la postura, en
   `maniquies-hipopresivos/` (`artemisa.png`, `aura.png`…). Es un muñeco
   simple dibujado con la postura exacta de la lámina: la IA solo tiene que
   "vestirlo", no adivinar dónde van los brazos. Las fotos de la lámina
   solas no alcanzaban: la IA inventaba la postura.
2. **Segunda imagen:** uno de tus dibujos que quedaron bien, que la IA copia
   como estilo: `public/hipopresivos/atenea.webp` para las de pie o de
   rodillas, `public/hipopresivos/maya.webp` para las de suelo. Cada postura
   dice cuál.
3. Adjunta **las dos, en ese orden** (el maniquí primero), y pega el prompt de esa postura, tal
   cual. Cada prompt describe la postura con palabras, además de la foto:
   la IA se equivoca mucho menos cuando tiene las dos cosas.
4. Guarda el resultado con el nombre de la postura (`artemisa.png`…) en
   `public/hipopresivos/`. Sirven png, jpg o webp.

En cuanto el archivo existe, el dibujo **aparece solo** en la app.

**Si sale mal:** abre un chat nuevo (la IA arrastra los errores del
anterior) y vuelve a intentar. Si falla algo puntual, pídelo en una frase
corta en el mismo chat: *"Keep everything the same, but the hands must rest
on the thighs."* Corregir una cosa por vez funciona mejor que regenerar todo.

**O que las haga el computador:** con la clave de Gemini en `.env.local`
(la misma de los dibujos de Fuerza), en la carpeta del proyecto:

```
py -3 generar_dibujos_hipopresivos.py --listar
py -3 generar_dibujos_hipopresivos.py --solo artemisa
py -3 generar_dibujos_hipopresivos.py
```

Manda las dos imágenes y el prompt de este documento, y guarda el dibujo en
`public/hipopresivos/`. Salta las que ya existen, salvo que le pongas
`--forzar`.

## Los nombres

| Archivo | Postura | Nivel en la app |
|---|---|---|
| `venus` | Venus: de pie, brazos hacia abajo y a los lados | Empezando |
| `atenea` | Atenea: de pie, brazos abajo; en la pausa, al frente | Empezando |
| `artemisa` | Artemisa: de pie, inclinada, manos sobre los muslos | Empezando |
| `aura` | Aura: de rodillas, brazos al frente | Empezando |
| `maya` | Maya: en cuatro apoyos, sobre los antebrazos | Empezando |
| `gaia` | Gaia: en cuatro apoyos, espalda redondeada | Empezando |
| `hestia` | Hestia: sentada, rodillas dobladas, brazos al frente | Empezando |
| `demeter` | Deméter: acostada boca arriba, brazos arriba | Empezando |
| `freya` | Freya: de pie, brazos sobre la cabeza | Ya me sale |
| `persefone` | Perséfone: estocada baja | Ya me sale |
| `isis` | Isis: de rodillas, pecho hacia el suelo | Ya me sale |
| `selene` | Selene: acostada de lado, brazos sobre la cabeza | Ya me sale |
| `acostada_cadera_arriba` | Afrodita, variante (la que dibujó Camila) | Ya me sale |
| `afrodita` | Afrodita: puente, brazos sobre la cabeza | Con práctica |

Todo en minúscula y sin tildes (`demeter`, `persefone`).

## Los prompts de las que faltan

Cada uno tiene dos partes, la postura y el estilo; se pega entero.

### `artemisa` — Artemisa: De pie, inclinada hacia adelante, manos sobre los muslos

Adjunta: `maniquies-hipopresivos/artemisa.png` + `public/hipopresivos/atenea.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen exactly from the side, facing right: she stands on the mat with the feet hip-width apart and both knees softly bent. She bends forward from the hips until the torso is almost horizontal, the upper back gently rounded. Both hands rest on the front of the thighs, just above the knees, fingers pointing inward; the elbows are bent and point out to the sides. The head hangs relaxed between the arms, looking toward the knees, and the bun hangs down. Weight spread over the whole foot, heels on the mat.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `aura` — Aura: De rodillas, erguida, brazos al frente

Adjunta: `maniquies-hipopresivos/aura.png` + `public/hipopresivos/atenea.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen exactly from the side, facing right: she kneels upright on the mat. Both knees on the mat, the shins lying flat on the mat behind her, toes tucked under. The hips are high, straight above the knees: she does NOT sit on her heels, the thighs are vertical. The torso is long and leans only slightly forward. Both arms are stretched straight forward at shoulder height, parallel to the floor; the wrists are bent back so the palms face forward and the fingertips point up, as if gently pushing a wall. Shoulders low, long neck, looking straight ahead.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `gaia` — Gaia: En cuatro apoyos, espalda redondeada hacia el techo

Adjunta: `maniquies-hipopresivos/gaia.png` + `public/hipopresivos/maya.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen exactly from the side, facing right: she is on all fours on the mat. Knees under the hips, the shins resting on the mat, toes tucked under. The hands are flat on the mat, placed wider than the shoulders, fingers pointing slightly inward. The elbows are clearly bent and open out to the sides, like the start of a push-up: the arms are NOT straight. The whole back is rounded strongly upward toward the ceiling like a stretching cat, the highest point in the middle of the back. The head hangs down between the arms, looking back toward the knees.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `hestia` — Hestia: Sentada, rodillas dobladas, talones en el suelo, brazos al frente

Adjunta: `maniquies-hipopresivos/hestia.png` + `public/hipopresivos/maya.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen exactly from the side, facing right: she sits on the mat with the knees bent and pointing up, the heels resting on the mat in front of her and the toes pointing up. The torso is upright and tall, vertical, not leaning back. Both arms reach forward with the elbows softly bent; the wrists are bent back so the palms face forward and the fingertips point up, as if gently pushing a wall. Shoulders low, long neck, looking straight ahead.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `freya` — Freya: De pie, brazos sobre la cabeza con los codos abiertos

Adjunta: `maniquies-hipopresivos/freya.png` + `public/hipopresivos/atenea.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen from the front at a slight three-quarter angle: she stands on the mat with the feet about hip-width apart, one foot a little ahead of the other, both knees softly bent and the weight slightly forward. Both arms are raised above the head: the elbows are bent and open wide to the sides, pointing up and out, and the hands meet just above the top of the head, so the arms frame the head like a diamond. The torso is tall, the shoulders stay low (not shrugged), looking straight ahead.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `persefone` — Perséfone: Estocada baja, rodilla de atrás en el suelo, manos en la cintura

Adjunta: `maniquies-hipopresivos/persefone.png` + `public/hipopresivos/atenea.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen exactly from the side, facing right: a low lunge on the mat. The front leg is forward with the foot flat on the mat and the knee bent at a right angle, the knee straight above the ankle. The back leg reaches far behind her: the back knee rests on the mat and the toes are tucked under. The torso is upright and vertical over the hips. Both hands rest on the waist, just above the hips, with the elbows bent and pointing backward. Long neck, looking straight ahead.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `isis` — Isis: De rodillas, pecho hacia el suelo, brazos estirados adelante

Adjunta: `maniquies-hipopresivos/isis.png` + `public/hipopresivos/maya.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen exactly from the side, facing right: she kneels on the mat with the knees hip-width apart and the toes tucked under. The hips stay high, straight above the knees, so the thighs are vertical. From there the chest lowers toward the mat and the forehead almost touches it. Both arms reach far forward, straight, resting on the mat, with the wrists bent back so the palms push forward and the fingertips point up. The back makes a long straight slope from the high hips down to the head.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `selene` — Selene: Acostada de lado, brazos estirados sobre la cabeza

Adjunta: `maniquies-hipopresivos/selene.png` + `public/hipopresivos/maya.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head: she lies on her side along the mat, the body one long straight horizontal line, head on the left and feet on the right, seen from the front so we see her chest. Both legs are straight, one on top of the other, feet together. Both arms are stretched above and beyond the head: the lower arm lies straight on the mat past the head, the upper arm curves over the head in an arch, and both hands meet beyond the head. The head rests on the lower arm.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

### `afrodita` — Afrodita: Acostada boca arriba, cadera arriba, brazos sobre la cabeza

Adjunta: `maniquies-hipopresivos/afrodita.png` + `public/hipopresivos/maya.webp`

```
Pose: the FIRST attached image is a simple mannequin showing the exact pose; keep the exact position and angle of every limb, the torso and the head, seen exactly from the side, head on the left: she lies on her back on the mat. The knees are bent and the feet are flat on the mat, hip-width apart, close to the buttocks. The hips are lifted high off the mat so the knees, hips and shoulders form one straight diagonal line, like a bridge. The shoulders, upper back and head stay on the mat. Both arms are stretched straight back beyond the head, lying on the mat, palms up.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

## Para rehacer una que ya está

Las cinco que ya están (Venus, Atenea, Maya, Deméter y la variante de
Afrodita) salieron de tus propias imágenes. Si algún día quieres rehacer
una, usa este prompt con la foto de la postura y un dibujo tuyo de estilo:

```
Redraw the exact body pose from the FIRST attached image, seen from the same angle, as a flat vector illustration.

Style: copy the SECOND attached image exactly. Same flat vector illustration, same woman (hair in a low bun, no facial features, sports top and leggings), same two flat tones: light gold for the arm and leg nearest to us, darker bronze for the far arm and leg. Same very dark forest-green background (#0d1a0d), same pale sage-green exercise mat under her, same size of the figure in the frame. Her top and leggings are the same gold and bronze tones as her skin areas, never black or grey. The figure fills about two thirds of the width, never cut off at the edges. No outlines, no gradients, no shadows, no muscle lines. Anatomically correct: two arms, two legs, five fingers on each hand, every joint bending the natural way, nothing floating. Horizontal 4:3, the whole body visible with empty margin all around. Turn the mannequin of the FIRST image into this woman: keep its pose exactly, do not copy its stick shapes. Absolutely no text, letters, numbers, arrows or watermark.
```

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
