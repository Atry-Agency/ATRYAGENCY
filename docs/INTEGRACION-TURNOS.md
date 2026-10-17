# Integración comercial de ATRY Turnos

Fecha de verificación: 17 de octubre de 2026.
Repositorio de trabajo: `Atry-Agency/ATRYAGENCY`. Copia local: `/Users/rodrigobrun/Desktop/ATRYAGENCY`.

## A. Archivos modificados

| Archivos | Motivo |
| --- | --- |
| `index.html` | Sección `05 / ATRY PRODUCTS`, inmediatamente después de Servicios y antes de Idea Lab. Se renumeran las secciones siguientes. Se preservan hero, proyectos, servicios, preview, Idea Lab y formulario. |
| `servicios.html` | Navegación coherente y referencia discreta al producto por suscripción, diferenciada del desarrollo a medida. |
| `proyectos.html`, `estudio.html`, `cafe.html`, `playground.html` | Productos en el menú global; menú móvil en todas las páginas; Playground sigue accesible en el footer. Se conservan los controles internos del recorrido Café. |
| `script.js` | Menú con Escape, foco, ciclo de Tab, `inert` y cierre al cambiar a escritorio; selector del preview responde al texto/icono dentro del botón; cursor omite páginas sin sus elementos. |
| `assets/site-config.js` | Destinos de la aplicación y catálogo comercial centralizado. Analítica externa continúa deshabilitada. |
| `assets/conversion.js` | Eventos de demo/plan con identificadores no sensibles; landing sin introducción que demore el acceso. Se reutiliza el evento `atry:track`. |
| `sitemap.xml`, `robots.txt` | Dominio real de esta copia y nueva landing. |
| `README.md` | Instrucciones de mantenimiento, pruebas y publicación. |

No se modifica `styles.css`: los estilos nuevos están delimitados en archivos propios.

## B. Archivos creados

- `turnos.html`: landing completa con propuesta de valor, tres pasos, capacidades por plan, rubros, personalización, planes, demo guiada, nueve preguntas frecuentes y cierre comercial.
- `assets/navigation.css`: ajustes compartidos para navegación, foco visible y tamaños reducidos.
- `assets/turnos/turnos.css`: sistema visual editorial, composición de producto y adaptaciones móviles.
- `assets/turnos/turnos.js`: destinos seguros desde configuración, demo y eventos locales.
- `assets/turnos/agenda.webp`, `dashboard.webp`, `reservas.webp`, `reservas-mobile.webp`: capturas de la aplicación funcionando localmente, con datos de demostración. No provienen de negocios de producción.
- `assets/turnos/turnos-social.png`: imagen para compartir el producto.
- `assets/OG-ATRY.png`: imagen corporativa que faltaba en los metadatos existentes.
- `docs/social-turnos.html`, `docs/social-agency.html`: fuentes reproducibles de ambas imágenes, con `noindex`.
- `scripts/sync-turnos-catalog.mjs`: sincroniza las tarjetas HTML con el catálogo central. No hay compilación obligatoria para servir la web.
- `tests/static-site.test.py`, `tests/product-interactions.test.mjs`: controles de rutas, contenido y comportamiento.
- `.github/workflows/site-check.yml`: ejecuta comprobaciones en pushes y pull requests con herramientas estándar.
- `.nojekyll`: publicación estática directa.
- `docs/responsive-qa.json`, `docs/navigation-qa.json`: resultados de las comprobaciones de navegador.

## C. Implementación visual

La home mantiene el concepto **WHERE CREATIVITY MEETS DIGITAL STRATEGY.** Productos combina un encabezado editorial claro con una composición oscura asimétrica, captura de agenda y reserva móvil. No se reemplaza el hero corporativo.

La landing utiliza una jerarquía propia, superficies neutras, negro y violeta `#4754e6`, con las fuentes Eurostile existentes y Phosphor local. No se incorpora otra librería ni un framework. El repositorio no contiene un manual de marca independiente; se reutilizan las variables, fuentes y recursos gráficos existentes.

El hero muestra el calendario real. La demostración alterna reservas, calendario y resumen del negocio; cada imagen puede abrirse en tamaño completo. Es una presentación guiada de capturas: no ejecuta reservas ni solicita credenciales.

Negocio se diferencia visualmente como opción para trabajar en equipo, coherente con su capacidad de cuatro profesionales. No se utilizan etiquetas de popularidad ni métricas inventadas. En móvil, las tres tarjetas se apilan y mantienen sus límites legibles.

Las animaciones se limitan a entradas y cambios de pantalla. `prefers-reduced-motion` elimina movimiento; el contenido sigue disponible sin JavaScript, incluidos enlaces, precios, FAQ y capturas alternativas.

## D. Navegación y publicación

- Sitio configurado en GitHub Pages: `https://atry-agency.github.io/ATRYAGENCY/`.
- Landing: `https://atry-agency.github.io/ATRYAGENCY/turnos.html`.
- La API de GitHub confirmó Pages desde `main`, carpeta `/`, sin dominio personalizado (`cname: null`). Se reemplazan los canonical provisionales `atry.agency` de esta copia por ese destino real.
- Home: Productos → `#productos`; interiores → `index.html#productos`.
- Descubrir ATRY Turnos → `turnos.html`.
- Comenzar ahora → `https://atry-agency.github.io/ATRY-Turnos/#/login`, la pantalla inicial con el panel violeta a la izquierda. Desde allí se elige Crear mi negocio.
- Iniciar sesión → `https://atry-agency.github.io/ATRY-Turnos/#/login`.
- Los botones de las tarjetas abren la pantalla inicial de acceso. Desde allí se continúa al registro real. El plan se solicita dentro de la aplicación; no se inventa un parámetro de preselección no soportado.
- `by ATRY Agency` vuelve a la web corporativa. Playground se conserva en el footer.

La autenticación y el funcionamiento del producto continúan fuera de este repositorio. No se modificó Supabase, ATRY Lab ni el backend de Turnos. Tampoco se cambió el repositorio personal `RodrigoBrun/ATRYAGENCY`.

## E. Información comercial verificada

Fuente: código de `ATRY-Turnos` (catálogo `config/commercial-plans.json`, módulo comercial, adaptador cloud y migraciones), más comprobación de solo lectura en **Configuración → Planes y capacidades** de ATRY Control Center en producción el 17/10/2026.

| Plan | Mensual UYU | Profesionales activos | Correos operativos por ciclo |
| --- | ---: | ---: | ---: |
| ATRY Individual | 790 | 1 | 0 |
| ATRY Negocio | 1.490 | 4 | 300 |
| ATRY Pro | 2.490 | 10 | 900 |

- Todos: reservas online, agenda, servicios, clientes, horarios con varios tramos, pausas, excepciones y personalización de identidad.
- Negocio y Pro: equipo, permisos, turnos fijos, espera, estadísticas básicas y correos operativos dentro del cupo.
- Pro: insights avanzados, exportaciones, recursos compartidos, oportunidades de agenda y ofertas de espera.
- Suscripción independiente por negocio. Contratación y cobro manual coordinados con ATRY; la habilitación requiere verificación del pago.
- Cambios de plan mediante solicitud, con confirmación de ATRY.
- La configuración de impuestos en producción figura **pendiente de definir**. La web lo comunica antes de la contratación; no afirma precio final con impuestos incluidos.
- No se anuncian prueba gratuita, descuentos, pagos online, WhatsApp automático, entrega garantizada de correos ni condiciones de cancelación no verificadas.

Para cambiar precios, límites o prestaciones: verificar primero la configuración vigente del producto, actualizar `assets/site-config.js`, ejecutar `node scripts/sync-turnos-catalog.mjs`, revisar las condiciones en texto y correr las pruebas. El catálogo es una copia editorial verificada, no una sincronización en vivo con Supabase.

## F. Pruebas realizadas

**15 pruebas automatizadas aprobadas**: 11 de estructura/publicación y 4 de comportamiento. Además: sincronización del catálogo, sintaxis JavaScript y `git diff --check`.

Se comprueban rutas locales y fragmentos de las siete páginas, recursos, identificadores únicos, un H1 por página, anidamiento de la landing, posición de Productos, conservación de herramientas, destinos externos, precios/límites, metadatos, imágenes, FAQ y ausencia de analítica externa.

Las pruebas de comportamiento ejecutan los scripts reales en un entorno aislado: cambio de captura y estado accesible, un único evento por clic de demo, evento de visita, FAQ al abrir y rechazo de destinos inseguros o ajenos a Turnos.

**Navegador real**:

- Home y landing en 320, 360, 375, 390, 430, 768, 1024, 1440 y 1920 px: 18 combinaciones sin desborde horizontal final.
- Menú móvil abierto en las siete páginas a 390 px: foco inicial y estado expandido correctos; Escape cierra y devuelve el foco al control.
- Demo: cambio a calendario, imagen completa y descripción actualizados.
- FAQ: apertura mediante Enter.
- Idea Lab: selección de reservas y generación de dirección.
- Live Preview: clic sobre el texto interno del selector cambia la URL del iframe al proyecto seleccionado.
- Café: elección avanza de 1/6 a 2/6; Volver regresa a 1/6.
- Playground: inicializa su catálogo de seis experiencias y controles sin errores JavaScript observados.
- Formulario: mantiene la respuesta honesta existente, «Formulario listo para conectar. Todavía no se envió ningún dato». No se envió información a terceros.
- Sin errores JavaScript nuevos observados en las vistas locales revisadas.

**Rendimiento**: las cuatro capturas WebP suman aproximadamente 191 KB; ninguna supera 100 KB. El par de imágenes del hero suma unos 89 KB. Se reservan dimensiones, la captura principal tiene prioridad alta y las inferiores utilizan carga diferida. Se reutilizan fuentes locales con `font-display: swap`. No hay servicios nuevos ni dependencias de ejecución.

No se declaran resultados de Core Web Vitals o auditoría WCAG completa: estos controles no son mediciones de campo de LCP/CLS/INP ni una certificación de accesibilidad. La revisión cubre foco, teclado, semántica, movimiento reducido por CSS y adaptación de los componentes intervenidos.

## G. Pendientes reales y límites

1. **Decisión comercial sobre impuestos**: el administrador debe definir el tratamiento en Turnos antes de confirmar contrataciones. Luego se actualiza `taxStatus` y la aclaración de la landing. El estado pendiente está comunicado públicamente.
2. **Canal del formulario corporativo preexistente**: falta configurar su destino de envío y los datos de contacto de la agencia. Esta misión lo conserva y no lo presenta como un formulario que envía. Los CTA de Turnos utilizan registro y contratación reales de su aplicación.
3. **Mediciones de campo**: evaluar Core Web Vitals cuando la landing tenga tráfico; no hay datos para afirmar esos objetivos como alcanzados. El sitio está preparado para integrar analítica, pero continúa deshabilitada y no transmite eventos a proveedores.
4. **Preview de terceros**: el selector y las URLs están comprobados; cada sitio externo controla su disponibilidad y permiso para cargarse en iframe. Se conserva el enlace para abrir el sitio real.

No hay una demo pública operativa con credenciales compartidas. Se entregó la alternativa solicitada: recorrido interactivo seguro de capturas verificadas.
