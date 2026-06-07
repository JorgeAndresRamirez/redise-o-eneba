# Rediseño Eneba LATAM — Arquitectura de Información en Red

## Contexto académico

Trabajo del **Máster en Diseño de Experiencia de Usuario (UX)** de la **UNIR — Universidad Internacional de La Rioja**.

**Asignatura:** Arquitectura de la Información, Navegación y Búsqueda.

## Equipo

| Integrante | Rol |
|---|---|
| Jorge Andrés Ramírez Sierra | Ingeniero de Software |
| Mariana Escobar Peralta | Diseñadora Visual |
| Linda Herrera | Diseñadora Gráfica |

## Demo en vivo

Publica el repositorio en GitHub y activa GitHub Pages para obtener una URL como:

**https://[tu-usuario].github.io/[nombre-del-repositorio]/**

Sustituye los corchetes por tu usuario y el nombre del repo tras el primer despliegue.

## Descripción del proyecto

Propuesta de rediseño de **Eneba LATAM** basada en una **arquitectura en red (grafo)**, donde el **juego** es el nodo conector central de la experiencia. A diferencia de la estructura jerárquica tradicional, los usuarios navegan mediante **cross-links**, **breadcrumbs funcionales** y conexiones directas entre productos, plataformas, ofertas y servicios.

### Características del prototipo

- Barra de búsqueda prominente con historial y sugerencias
- Navegación L1 interconectada: Juegos, Ofertas, Recargas, Dispositivos
- Hub de filtros multidimensionales (Modo, Género, Mecánica, Perspectiva, Dispositivos)
- Ficha de producto con conexiones de red (plataforma, gift cards, suscripciones, ofertas)
- Carrito transversal con flujo Bolsa → Pago → Confirmación
- Cuenta de usuario: Registro, Login, Mi cuenta, Favoritos, Mis compras
- Footer completo con cross-link Ayuda → Contáctanos
- Soporte accesible solo desde Home

## Arquitectura

```
Eneba Home
├── Búsqueda (entrada al grafo)
├── Iniciar sesión → Mi cuenta | Favoritos | Mis compras
├── Juegos → Filtros + Adiciones → Ficha de juego
├── Ofertas ↔ Juegos ↔ Recargas (interconexión L1)
├── Recargas (Monedas, Gift card, Dinero digital, Suscripciones, Licencias)
├── Dispositivos y Consolas
└── Soporte (solo desde Home)
```

Los **cross-links** (líneas azules en el sitemap) permiten saltar entre nodos sin volver a Home.

## Cómo ejecutar localmente

### Opción 1 — Abrir directamente

1. Clona o descarga este repositorio.
2. Abre `docs/index.html` en tu navegador.

### Opción 2 — Servidor local

```bash
cd docs
npx serve .
```

Luego visita `http://localhost:3000`.

### Opción 3 — Cursor Canvas (desarrollo)

Abre el archivo Canvas en Cursor IDE para iterar el prototipo dentro del editor:

`canvases/eneba-latam-redesign.canvas.tsx` (en el proyecto de Cursor asociado).

## Despliegue en GitHub Pages (gratuito)

1. Crea un repositorio **público** en GitHub (ej. `eneba-latam-rediseno-ux`).
2. Sube el contenido de este proyecto:

```bash
git init
git add README.md docs/ assets/
git commit -m "Prototipo Eneba LATAM — arquitectura en red"
git branch -M main
git remote add origin https://github.com/[TU-USUARIO]/[TU-REPO].git
git push -u origin main
```

3. En GitHub: **Settings → Pages → Build and deployment**
4. Source: **Deploy from a branch**
5. Branch: **main**, Folder: **/docs**
6. Guarda y espera 1–2 minutos. La URL aparecerá en la misma sección.

## Tecnologías

- HTML5, CSS3, JavaScript (vanilla)
- Tailwind CSS (CDN)
- Cursor Canvas (React + SDK `cursor/canvas`) para iteración en IDE
- GitHub Pages para hosting estático

## Estructura del repositorio

```
REDISEÑO ENEBA/
├── README.md
├── docs/                 # Mockup desplegable (GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── .nojekyll
└── assets/               # Capturas del sitemap
```

## Disclaimer

Prototipo académico con fines educativos. **No es un producto oficial de Eneba.** Eneba y sus marcas son propiedad de sus respectivos titulares. Los datos, precios y productos son simulados.
