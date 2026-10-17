# ATRY Agency — Web v2

Versión 2 de la web institucional de ATRY Agency, desarrollada en HTML, CSS y JavaScript puro.

## Páginas
- `index.html`: home principal.
- `proyectos.html`: archivo de proyectos.
- `servicios.html`: detalle de servicios.
- `estudio.html`: presentación del estudio.
- `playground.html`: experiencia interactiva de marca.
- `cafe.html`: conversación guiada.
- `turnos.html`: presentación comercial de ATRY Turnos.

## Funcionalidades
- Portfolio generado desde un array en `script.js`.
- Filtros por categoría.
- Modal de proyecto y enlaces externos.
- Preview en iframe con selector Desktop / Tablet / Mobile.
- Servicios desplegables.
- Idea Lab interactivo.
- Playground visual.
- Menú responsive, scroll animations y soporte para `prefers-reduced-motion`.

## Pendientes reales
- Conectar el formulario a Supabase, Formspree, EmailJS o backend propio.
- Completar correo, teléfono, WhatsApp y redes sociales.
- Reemplazar los mockups CSS por capturas WebP reales si se desea.
- Confirmar integrantes y cargos del equipo.
- Añadir testimonios solo cuando existan testimonios reales.

## GitHub Pages
Subir todos los archivos respetando la estructura y activar Pages desde la rama principal. Todas las rutas son relativas.

## ATRY Products / Turnos

Sitio de esta copia: https://atry-agency.github.io/ATRYAGENCY/

La aplicación vive separada en https://atry-agency.github.io/ATRY-Turnos/. No hay autenticación ni backend de Turnos en esta web.

- Configuración comercial y destinos: `assets/site-config.js`.
- Después de actualizar planes: `node scripts/sync-turnos-catalog.mjs`. Esto mantiene el HTML disponible sin JavaScript; no es una compilación obligatoria para publicar.
- Pruebas: `python3 tests/static-site.test.py`, `node --test tests/*.test.mjs`, `node scripts/sync-turnos-catalog.mjs --check`.
- Vista local: `python3 -m http.server 3460`.
- Informe y límites verificados: [integración de Turnos](docs/INTEGRACION-TURNOS.md).
- Publicación estática gratuita: rama `main`, carpeta raíz.
