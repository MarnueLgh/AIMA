---
name: renata-solis
version: 1.0
created: 2026-09-08
status: active
project: AIMA
tags: [character, female, editorial, latina, mexican, jewelry]
---

# Renata Solís — Character Bible

> Segunda modelo de AIMA. Complementa a [Cleo Hartmann](CLEO-description.md).
> **Cleo (26) encarna *la del stack*. Renata (31) encarna *la que se compra sola*** —
> los dos perfiles de clienta definidos en `manual-aima.html`.
>
> Existe por dos razones concretas, no por variedad decorativa:
> 1. AIMA le vende a mexicanas de 19 a 40. Una sola modelo rubia escandinava
>    hace que la marca no se parezca a su clienta.
> 2. El baño dorado sobre acero **se lee distinto sobre piel media que sobre piel clara**.
>    Necesitamos las dos referencias para que el catálogo sea honesto.

---

## 01 · Identidad narrativa

Renata Solís, 31 años. Vive en la Roma Norte, Ciudad de México.
Arquitecta en un despacho chico; lleva sus propios proyectos desde hace dos años.
Corre en el Parque México tres veces por semana y se pone las mismas cadenas para hacerlo.

Se compra sus cosas sola, sin esperar fecha ni permiso. Cuando algo le gusta lo usa
todos los días hasta que se vuelve parte de ella — no rota accesorios, los acumula.

**Personalidad:** Segura sin ser dura. Económica al hablar. Se ríe con los ojos antes
que con la boca. El tipo de persona que no explica sus decisiones porque no le hace falta.

---

## 02 · Físico general

| Atributo        | Valor                                    |
|-----------------|------------------------------------------|
| Edad aparente   | 30–33 años                               |
| Estatura        | 168 cm aprox (5'6")                      |
| Complexión      | Delgada atlética, hombros definidos      |
| Silueta         | Hombros marcados, cintura media          |
| Cuello          | **Largo y despejado** — es la modelo de collares |
| Manos           | Dedos largos, uñas cortas sin esmalte    |

---

## 03 · Rostro

| Atributo  | Descripción                                                  |
|-----------|--------------------------------------------------------------|
| Forma     | Corazón suave, mandíbula definida, pómulos altos             |
| Piel      | **Tono medio cálido / moreno claro**, dewy, poro visible     |
| Ojos      | Café oscuro, almendrados, mirada directa                     |
| Cejas     | Gruesas, naturales, arco marcado                             |
| Labios    | Llenos, tono nude cálido, acabado satinado                   |
| Nariz     | Recta, puente definido, **sin argolla** (la distingue de Cleo)|
| Marca     | Lunar pequeño sobre el pómulo izquierdo                      |
| Orejas    | Lóbulo despejado, una sola perforación por lado              |

---

## 04 · Cabello

| Atributo  | Descripción                                                  |
|-----------|--------------------------------------------------------------|
| Largo     | Hasta la clavícula, un poco más largo que Cleo               |
| Color     | Castaño oscuro natural, reflejos cálidos con la luz          |
| Textura   | Ondulado natural tipo 2B, definido pero sin peinar           |
| Partido   | Al centro, a veces recogido tras la oreja del lado del arete |

**Nota de producción:** para las tomas de arracadas y de cuello, el cabello va
recogido o detrás de la oreja. La joyería no compite con el pelo.

---

## 05 · Estilo / Ropa

- **Vibe:** Minimalismo cálido mexicano, sastrería suave, layering ligero
- **Paleta:** Crema, camel, arena, gris topo, blanco hueso — **nunca estampados**
- **Outfits tipo:** Camisa de lino oversized abierta sobre top blanco de tirantes
  + pantalón de vestir amplio color arena. O suéter fino de cuello redondo color crema.
- **Escote:** Amplio y despejado. Cuello barco, camisa abierta, tirantes finos.
  Es la condición para que se vea el stack de cadenas.
- **Accesorios:** Solo joyería AIMA. Sin reloj, sin lentes, sin bolsa en cuadro.

---

## 06 · Fotografía — Estilo técnico

| Parámetro       | Regla                                                    |
|-----------------|----------------------------------------------------------|
| Cámara          | Medium format film look                                  |
| Profundidad     | Shallow depth of field siempre                           |
| Iluminación     | Luz de ventana suave y difusa, dirección lateral         |
| Fondos base     | **Arena `#E8E1D6` · Hueso `#F4F1EC` · Lino sin planchar**|
| Fondo prohibido | **Blanco puro** — el plateado desaparece contra el blanco |
| Estilo          | Editorial candid, nunca posado de catálogo               |
| Grano           | Grano de película ligero visible                         |
| Piel            | Textura real: poro, brillo natural, sin retoque de piel  |

---

## 07 · Negative prompts

```
ugly, deformed, extra limbs, cloned face, blurry, low quality,
watermark, text, signature, oversaturated, HDR, harsh flash lighting,
heavy makeup, colored contacts, artificial smile, stock photo pose,
anime, illustration, cartoon, 3D render, plastic skin, smoothed skin,
pure white background, chunky jewelry, gemstones, diamonds, rings
```

> `rings` va en la lista a propósito: **AIMA no vende anillos.**
> Una mano con anillos en la foto vende algo que no existe en el catálogo.

---

## 08 · BASE — Descripción maestra del personaje

> Pegar este bloque al inicio de CADA prompt para mantener consistencia.

```
Mexican woman, early 30s, soft heart-shaped face, high cheekbones, defined jawline,
thick natural dark brows with a marked arch, dark brown almond eyes, direct gaze,
warm medium-tan skin, dewy with visible pore texture and natural shine,
small beauty mark on left cheekbone, full lips in warm nude satin,
straight nose, no nose ring, collarbone-length dark brown wavy hair
with warm highlights, naturally defined waves, center part,
lean athletic build, defined shoulders, long bare neck, long fingers.
Shot on medium format film, shallow depth of field,
soft diffused window light from the side, warm sand backdrop,
light film grain, real skin texture, no retouching.
Editorial candid style.
```

---

## 09 · Nota sobre el uso conjunto con Cleo

La ficha de Cleo especifica **`muted dusty blue seamless studio backdrop`**.
Ese fondo pertenece a otro proyecto y **no aplica en AIMA**: la paleta de la marca
es papel, hueso y arena, y el azul frío apaga el baño dorado.

Al usar el BASE de Cleo en prompts de AIMA, **sustituir siempre**:

| En el BASE original de Cleo | Reemplazar por |
|---|---|
| `muted dusty blue seamless studio backdrop` | `warm sand seamless backdrop` |

El resto del bloque de Cleo se deja intacto. Su argolla y su hoop dorados de base
son compatibles con el catálogo — de hecho ayudan.

---

## 10 · Registro de versiones

| Versión | Fecha      | Cambios                        |
|---------|------------|--------------------------------|
| 1.0     | 2026-09-08 | Character Bible inicial creada |
