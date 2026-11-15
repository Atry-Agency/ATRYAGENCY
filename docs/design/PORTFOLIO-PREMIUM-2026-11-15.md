# Propuesta local — Portfolio y ATRY Turnos

Sin publicación, push ni cambios en ATRY Turnos/Supabase.

## Composición

- Galería editorial: Jarama como pieza principal; Sandro Fernández y Celeste en Agenda completan la grilla. Los filtros reorganizan las piezas sin espacios reservados.
- Se retiró Salud y Bienestar UY del catálogo compartido, la home, archivo, selector y modales. No se modificó su sitio ni repositorio.
- El visualizador usa capturas propias de escritorio (1440 × 960), tablet (834 × 1112) y móvil (390 × 844). La pantalla inicial corresponde al tamaño del visitante; la selección manual permite comparar.
- Los estados de carga dependen de la carga y decodificación de la imagen. Un fallo muestra un mensaje y conserva el enlace al sitio original. Las respuestas tardías no pueden reemplazar la selección actual. No se cargan documentos externos en iframes.
- Los casos utilizan las mismas capturas; Escape, retorno de foco, bloqueo del fondo y ciclo de Tab mantienen el recorrido accesible.
- Turnos utiliza una captura de su agenda semanal actual y su panel móvil. Los datos son los de la demo pública aislada, sin sesiones reales ni escrituras remotas.
- `turnos.html` es una presentación de producto de Agency. Funciones, precios y contratación se remiten a `https://atryturnos.com/descubrir.html`, sin un segundo catálogo comercial.
- Se conservaron logos, tipografía y acentos existentes. Sin nuevas dependencias de ejecución, imágenes generadas ni analítica adicional.

## Recursos y procedencia

`assets/projects/captures.json` registra los destinos, fecha, estado HTTP y viewport de las doce capturas. Todos los sitios respondieron HTTP 200. Se convirtieron a WebP sin alterar el contenido. El conjunto ocupa menos de 700 KB; cada archivo, menos de 100 KB. Las imágenes de la galería y del producto usan carga diferida y dimensiones explícitas.

Los sitios externos pueden cambiar después de la captura. Los previews son imágenes, no formularios operativos. Jarama sigue identificado como proyecto en desarrollo.

## Verificación reproducible

- `python3 tests/static-site.test.py`
- `node --test tests/product-interactions.test.mjs`
- `node scripts/sync-turnos-catalog.mjs --check` (ahora verifica el destino oficial, sin replicar precios)
- `node --check script.js` y adaptadores relacionados.
- `node scripts/portfolio-browser.cjs`, con Playwright disponible y servidor local en `http://127.0.0.1:3356`.

Las capturas de revisión son encuadres de sección: se excluye la cabecera fija únicamente durante la captura para que no aparezca sobre el contenido al fotografiar una sección más alta que el viewport. La navegación continúa activa en la página real.

## Resultado final local

- 10 verificaciones estáticas aprobadas; 3 pruebas del adaptador de enlaces aprobadas.
- Chrome y WebKit: 320, 390, 430 y 1440 px aprobados (8 combinaciones). En cada una: filtros, modal, Tab/Shift+Tab/Escape, las nueve combinaciones proyecto/dispositivo, selección rápida, error de carga y recuperación, navegación, Idea Lab, archivo, presentación Turnos, servicios y Café. Cero escrituras y red externa bloqueada en las pruebas locales.
- Comprobación sintáctica JavaScript y destinos comerciales aprobada. Sin proceso de compilación ni nuevas dependencias: el sitio continúa siendo HTML/CSS/JS estático.
- La prueba más estricta detectó anchos intrínsecos de selects de Idea Lab y contacto que podían ampliar el viewport de 320 px. Se limitaron mediante CSS, sin modificar formularios ni navegación.
- Se revisaron visualmente capturas de galería, visualizador y Turnos en escritorio e iPhone. Las versiones finales están en la entrega local `Entregas/ATRYAgency-Portfolio-2026-11-15` del workspace.
- Previsualización local: `http://127.0.0.1:3356/`.

Pendiente únicamente revisión estética del usuario antes de autorizar publicación. No se ejecutó push ni despliegue.

## Pulido final posterior a la aprobación de dirección

- Sandro: nuevas capturas de escritorio, tablet y móvil mediante desplazamiento nativo hasta su portada principal. No se alteraron DOM, estilos ni contenido del sitio. El manifiesto registra el desplazamiento exacto y la nueva fecha.
- Celeste: el marco de escritorio conserva la captura completa, con titular y acciones sin cortes; el encuadre móvil mantiene el titular completo.
- Turnos: el móvil gana tamaño y dispone de una columna propia. Una nueva aserción geométrica comprueba que no se superpone sobre la agenda, en los ocho escenarios Chrome/WebKit de 320, 390, 430 y 1440 px.
- El visualizador indica «Capturas reales» y «Capturas estáticas», y explica que para navegar y probar cada experiencia hay que abrir el sitio original.
- 10 verificaciones estáticas, 3 pruebas de enlaces y las 8 combinaciones de navegador/viewport aprobadas nuevamente. Sin publicación, backend ni cambios en los sitios originales.

## Marco de teléfono estilo iPhone

Presentación decorativa de titanio oscuro, borde fino con reflejo contenido, esquinas continuas, botones laterales, barra de estado, Dynamic Island y gesto inferior. El bloque de estado y el gesto están fuera del archivo de captura: no se recorta, retoca ni superpone ningún elemento a la imagen original del panel. Los adornos quedan fuera del árbol de accesibilidad. Sin animaciones ni dependencias nuevas.

Comprobación enfocada Chrome/WebKit a 320, 390, 430 y 1440 px: imagen completa cargada, estado arriba y gesto abajo sin solapamientos, teléfono separado de la agenda y cero desbordamiento horizontal. Las 10 pruebas estáticas volvieron a pasar. No se modificó ningún archivo de captura ni el proyecto ATRY Turnos. Sin push ni publicación.
