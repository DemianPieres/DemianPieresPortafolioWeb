# Auditoría y decisiones — Fases 0, 1 y 2

## Fuente y alcance

- Se leyó primero `AGENTS.md`, luego todos los Markdown de contexto de raíz, y se inspeccionaron `UXui/` e `img/`.
- El directorio no contenía aplicación, package.json ni metadatos `.git`; no se inicializó Git ni se realizaron commits.
- Skill verificada: `.agents/skills/ui-ux-pro-max/SKILL.md`. Consultas aplicadas: `keyboard focus navigation --domain ux` y `fonts images app router --stack nextjs`. Figma mantiene prioridad.
- Referencias abiertas: Inicio 3840×8306, Skills 3840×8018 y Navbar 456×70. Se inspeccionaron el retrato, Linux y el asset Redux (`Vector.png`).
- `img/` contiene dos duplicados idénticos por SHA-256 a los originales de `UXui/`; se usa una sola fuente mediante imports estáticos.
- El alcance pedido al final del mensaje es Fase 0 + Fase 1. Las rutas provisionales permiten revisar los componentes compartidos sin declarar terminadas las fases 2–6.

## Diseño y comportamiento

- Geist Sans / Mono: fallback indicado por `DESIGN_SYSTEM.md`; no hay archivos de fuentes originales.
- Navbar desktop 456×70, botones de 50 px. Mobile: cápsula 352×64, botones de 44 px y siete destinos visibles. En flujo; superpuesta al retrato en Inicio. No es fija para evitar tapar contenido o foco.
- Iconos utilitarios Lucide; GitHub y Linux usan assets originales. El último símbolo de Navbar.png no identifica LinkedIn: se usa el monograma tipográfico `in` para respetar el destino solicitado.
- Estado activo real por pathname (Skills.png muestra Inicio seleccionado, pero la funcionalidad solicitada tiene prioridad).
- Contacto y cierre siguen la composición compartida de Figma, con inversión clara/oscura. Acento ajustado a #4658ed para mantener contraste del texto blanco. Footer enlaza al inicio mediante ancla nativa.
- Email extraído de ambas capturas: `drkdemianpieres@gmail.com`. Teléfono omitido hasta confirmar intención de publicación. No se inventaron URLs, fechas, credenciales o descripciones de trabajos.
- Retrato original integrado para revisar el shell de Inicio. Intro breve provisional; la fidelidad integral se trabajará en Fase 2.
- El `sizes` del retrato móvil contempla el ancho intrínseco necesario para cubrir hasta 650 px de alto con object-fit, evitando ampliar una variante de solo 375 px al recortarla.
- GSAP: entrada breve del navbar y CTA magnético; useGSAP y matchMedia revierten animaciones y listeners. Preferencia reducida también funciona si cambia durante la sesión. ScrollTrigger queda registrado para fases siguientes.
- Lenis instalado, deliberadamente sin instancia mientras no haya storytelling/scroll largo que justifique reemplazar el desplazamiento nativo.
- No se añadieron kits de UI, Framer Motion, 3D ni dependencias de utilidades sin uso.

## Datos faltantes reales

- Portadas originales de los cuatro proyectos del brief: solo están dentro de la captura; no se recortaron.
- Confirmar proyectos propios, descripciones, tecnologías, años y URLs antes de publicarlos. Seeds con `status: draft`.
- Faltan assets de CSS, Bootstrap, Sass, Material UI, Ruby, Django, Rails, Motion, Spline, Firebase, Azure, Google Cloud, Postman, Jest y Selenium; registrados en `skills.ts`. Mención de Motion en datos visuales no implica instalarlo.
- Completar biografía y confirmar titulación formal, institución y fechas. Experiencia y formación son arrays vacíos tipados.
- El registro `assets.ts` incluye todos los logos proporcionados; su renderizado en cards pertenece a Fase 3.

## Siguiente trabajo al cierre de Fases 0 y 1

Fase 2: Inicio completo; Fase 3: masonry de Skills; Fases 4–6: Projects/About/Resume; Fase 7: validación integral y performance. No se declara equivalencia pixel-perfect de las páginas provisionales ni mediciones Lighthouse todavía.

## Validación final

- `npm run lint`: sin errores ni warnings.
- `npm run build`: correcto, las cinco rutas prerenderizadas; Next 16.3.5 / React 19.3.0.
- `npm run typecheck`: correcto; build posterior también verificó TypeScript.
- `npm run test:e2e`: 7 pruebas aprobadas en Chromium contra producción (21.2 s).
- 25 combinaciones de ruta/ancho: 375, 390, 768, 1024 y 1440 px. Sin overflow horizontal ni errores de consola/pageerror; siete links y estado activo correctos, targets >=44 px.
- Teclado: skip link enfoca main, navegación a Skills y enlaces externos seguros. Contacto apunta al email de Figma.
- Axe WCAG A/AA en Inicio y Skills con movimiento reducido: sin violaciones detectadas. No equivale a una auditoría manual completa con lectores de pantalla.
- Capturas generadas en `artifacts/screenshots/`. Revisión visual de muestras en los cinco anchos; ajustados nitidez del retrato móvil y símbolo de terminal del navbar. La comparación corresponde al sistema base, no a páginas completas.
- Una primera prueba midió targets antes de finalizar el scale de entrada; se corrigió la sincronización de la prueba para medir el estado final.

## Fase 2 — Inicio

### Auditoría y alcance

- Base revisada: commit `458a332` (`feat: initial portfolio setup phases 0 and 1`), sin cambios locales al comenzar. Las fases anteriores ya aportaban shell, tipografía, navbar, contacto, footer, datos y siete pruebas; se conservaron.
- Se releyeron `AGENTS.md` y todos los Markdown de contexto de raíz y `docs/`. Se inspeccionaron Inicio, Skills y Navbar; Skills se consultó como referencia, sin implementar Fase 3.
- Skill UI/UX Pro Max aplicada mediante consultas `scroll reveal reduced motion --domain gsap` y `responsive images server components --stack nextjs`. No se generó un sistema visual alternativo.

### Implementación y decisiones

- `src/app/page.tsx` compone Inicio como Server Component; `src/components/home/featured-projects.tsx` consume el dataset existente. `home-motion.tsx` limita el código cliente a GSAP con scope local, `matchMedia` y cleanup al desmontar o cambiar breakpoints/preferencias.
- `src/app/home.css` contiene estilos acotados a Inicio: hero original, presentación en dos columnas, título editorial, grilla 2×2, títulos con flecha circular y CTA hacia `/projects`. Las rutas de fases posteriores y el shell compartido no se modificaron.
- Proporciones derivadas de Inicio: contenedor con márgenes ~6.9%, portadas con relación 1.715, separación horizontal ~2.1vw y títulos fluidos. En móvil la presentación y los proyectos pasan a una columna; en tablet el encabezado de trabajos se apila para preservar legibilidad.
- Faltan las cuatro portadas originales: se usan bloques HTML con “Portada pendiente” y “Borrador · Por confirmar”. La segunda fila conserva el contraste oscuro de la referencia. No se recortaron ni reconstruyeron imágenes de proyectos desde el screenshot.
- Los borradores no tienen enlaces individuales. El componente admite portadas y enlaces de proyectos publicados cuando se completen los datos; no se inventaron demos, repositorios ni detalles. El enlace general a GitHub y el CTA a `/projects` funcionan.
- Se conserva la biografía corta disponible en `profile.ts`; no se incorporaron las afirmaciones académicas o personales que la auditoría anterior dejó por confirmar. La fuente sigue siendo Geist, el fallback acordado.
- Movimiento: entrada suave de escala del retrato y cards por scroll, stagger breve por fila en desktop. Los encabezados usan el efecto reversible documentado abajo. Sin parallax continuo ni nueva instancia de Lenis. El contenido se renderiza visible sin JavaScript y al activar movimiento reducido. Navbar y CTA conservan sus animaciones previas.
- No se agregaron dependencias ni se modificaron assets, datos personales o proyectos.

### Verificación de Fase 2

- `npm run lint`, `npm run build` y `npm run typecheck`: correctos; las cinco rutas siguen prerenderizadas.
- `npm run test:e2e`: **10 pruebas aprobadas** en Chromium contra producción. Conserva las 25 combinaciones de rutas/anchos y añade tres pruebas de Inicio.
- Sin errores de consola/pageerror ni overflow horizontal en 375, 390, 768, 1024 y 1440 px. Navegación por teclado, targets del navbar, CTA a proyectos, regreso al inicio y enlaces externos verificados.
- Axe WCAG A/AA en Inicio y Skills: sin violaciones detectadas. Verificados contenido sin JavaScript, cambio de movimiento reducido en ejecución y revelados tras navegar repetidamente entre Inicio y Skills.
- Capturas en `artifacts/screenshots/home-{375,390,768,1024,1440}.png` (ignoradas por Git, regenerables). Revisión visual en los cinco anchos y comparación desktop con Inicio escalado a 1440 px; se ajustaron tamaño del título, ritmo vertical y contraste de placeholders. La referencia mide 1440×3115 al escalarla y la captura final 1440×3157; esa cercanía de altura no implica equivalencia visual del contenido faltante.
- `git diff --check`: correcto. Sin nuevas dependencias. No se realizaron mediciones Lighthouse ni una auditoría manual completa con lector de pantalla.

### Continuidad para el próximo chat

- Siguiente alcance: **Fase 3 — Skills pixel-faithful**, según `IMPLEMENTATION_PLAN.md`. `/skills` conserva el placeholder de Fase 1, con los logos y categorías ya registrados.
- Inicio queda implementado con contenido provisional identificado. Para cerrar la fidelidad de sus portadas, hacen falta los assets originales y confirmar autoría/datos de los proyectos. No equivale a una reproducción pixel-perfect del contenido pendiente.
- Se mantienen pendientes de la auditoría inicial la confirmación de biografía/estudios, teléfono y logos faltantes de Skills. No se avanzó a Fases 3–7 ni se realizó deploy.

## Ajuste de Inicio — texto con desenfoque ligado al scroll

- Solicitud posterior: reproducir la animación de textos de [2K-Aakaash](https://github.com/2k-Aakaash/2K-Aakaash). Referencia inspeccionada: commit `4fee8b31507d05e35df883598418ca0227a9d0c7`, interacción `a-48` / “Blurry Text Scroll” en `script.js`.
- Se reprodujo el comportamiento con GSAP propio: texto desde 50 px abajo y blur de 10 px, nitidez y posición finales al completar el primer 20% del recorrido, movimiento reversible y suavizado. `circ.inOut` se aplica al desenfoque y desplazamiento lineal. `scrub: 0.7` aproxima el suavizado de Webflow; no es una equivalencia matemática entre motores.
- Aplicado solamente dentro de Home a presentación, título de trabajos, encabezado de contacto y frase del cierre. Sin copiar bundles del repositorio, incorporar Webflow, agregar dependencias o alterar textos/layout. `clamp` permite terminar el efecto de cierre antes del límite inferior de scroll.
- `matchMedia` revierte filtro y transformaciones al activar movimiento reducido o desmontar. Sin JavaScript los textos permanecen nítidos. Se añadieron pruebas de avance y retroceso del efecto en 390 y 1440 px y comprobación de limpieza del filtro al cambiar preferencias.
- Validación del ajuste: lint, build, typecheck y `git diff --check` correctos; **12 pruebas Playwright aprobadas**. Revisadas capturas del texto nítido en móvil y del estado desenfocado al retroceder en desktop (`artifacts/screenshots/home-text-*.png`).

## Selector claro/oscuro en Inicio

- Botón de 52×52 px arriba a la derecha del hero. El SVG provisto coincide con `icon-park-outline/dark-mode`: instalado ejecutando `npx --yes shadcn@latest add @icons0/icon-park-outline/dark-mode --yes`. Registro configurado en `components.json`; componente generado en `src/components/icons/icon-park-outline/dark-mode.tsx`. El comando no modificó dependencias ni estilos globales.
- `ThemeToggle` incorpora nombre accesible, `aria-pressed`, foco y teclado nativos; animación GSAP de giro/escala y onda, interrumpible y cancelable al activar movimiento reducido.
- La paleta neutra se invierte en Home: negro/blanco de superficies y tipografía, navbar, tarjetas y cierre. Se ajustan grises y foco para contraste. El retrato y los logos mantienen su aspecto natural; el icono monocromático de GitHub cambia para resultar legible. El azul de contacto se conserva como acento.
- Preferencia `demian-home-theme` en localStorage, sincronizada entre pestañas. El script inicial aplica el atributo antes del primer pintado; `useSyncExternalStore` mantiene el botón sincronizado sin alterar el HTML del servidor. La supresión de aviso de hidratación se limita al atributo de `html` que cambia ese script.
- Las reglas CSS se acotan a `.home`; otras rutas conservan sus temas anteriores. Si localStorage está bloqueado, el selector funciona sin persistencia. Sin JavaScript se muestra Inicio claro y se oculta el botón inoperable.
- Se conservaron los cambios locales de biografía encontrados durante esta tarea; solo se eliminó su import de `profile` que había quedado sin uso.
- Validación: lint, build, typecheck y `git diff --check` correctos; **19 pruebas Playwright aprobadas**. Modo oscuro revisado visualmente en 375/390/768/1024/1440 px, sin overflow. Axe en oscuro a 390 y 1440 px sin violaciones; navegación por teclado, persistencia, regreso entre rutas, clics sucesivos y almacenamiento bloqueado verificados. Capturas en `artifacts/screenshots/home-dark-*.png`.

## Nombre superior — React Bits ParticleText

- Se descargó el [JSON original JS-CSS](https://reactbits.dev/r/ParticleText-JS-CSS.json) y se ejecutó `npx --yes shadcn@latest add @react-bits/ParticleText-JS-CSS --yes`. El registro declara `dependencies: []` y `registryDependencies: []`; package.json y lockfile no cambiaron.
- Archivos instalados: `src/components/ParticleText.jsx` y `.css`. Se conserva la variante JavaScript solicitada; `ParticleText.d.ts` tipa la integración con los componentes TypeScript.
- `home/particle-name.tsx` integra `DemianPieres.Dev`, alineado verticalmente con el botón de tema, en un bloque superior izquierdo de 52 px de alto y ancho máximo de 520 px. La muestra de 360 px con fondo oscuro se adaptó al encabezado transparente para preservar el retrato y la composición.
- Se priorizó la petición explícita de dispersión al pasar el cursor: `trigger="hover"` frente al `mount` del segundo ejemplo. Se conservan los parámetros de ese último ejemplo (2.2/4, 190, 1600, 420, 42, 120, 0.8, peso 800 y glow). Hasta 1100 px, partículas 1.2 y muestreo 2 preservan la definición del nombre compacto. Entre 768 y 1100 px se reduce el bloque a 30vw para que el texto negro no se superponga al cabello del retrato.
- Color negro en claro y blanco en oscuro; sincronizado con el selector. Se añade sombra corta en oscuro para separar el texto del retrato. El componente ajusta el tamaño de fuente solicitado al ancho real disponible.
- Adaptaciones locales al código de registro: directiva cliente, buffer opcional `overflowPadding` para dibujar la dispersión fuera del rótulo sin ampliar su zona interactiva, eventos en el contenedor, canvas sin capturar punteros y `touch-action: pan-y`. El hero recorta únicamente los puntos que exceden sus límites, evitando overflow del documento.
- Se añade fallback HTML visible hasta el primer dibujo y sin JavaScript/canvas; se conserva el texto alternativo del componente. Se pausa requestAnimationFrame con IntersectionObserver y visibilidad de pestaña; movimiento reducido produce un dibujo estático. Cleanup invalida las tareas de fuentes y elimina observers, listeners y frames pendientes.
- GSAP continúa como motor principal de las animaciones existentes; el canvas de React Bits es una integración puntual solicitada, sin instalar otro framework de motion.
- Validación: lint, build, typecheck y `git diff --check` correctos; 21 pruebas Playwright, incluyendo dispersión/reagrupación, pausa de frames fuera de pantalla y al activar movimiento reducido, cambio de color real del canvas, resize y fallback sin JavaScript. Alineación con el botón y ausencia de overflow verificadas en 375/390/768/1024/1440 px. Revisión visual de los cinco anchos y de la dispersión con cursor; capturas `artifacts/screenshots/particle-name-*.png` y `home-dark-*.png`.


## Tema global con Pixel Swap
- Solicitud posterior a Fase 2: el selector y la preferencia se comparten en Inicio, Skills, Projects, About, Resume y 404. Esto sustituye el alcance exclusivo de Inicio descrito arriba; no desarrolla las pantallas pendientes de Fase 3.
- Se conserva la clave localStorage y el atributo `data-home-theme` para mantener las preferencias existentes. `theme.css` centraliza los tokens y el botón se renderiza desde PageShell; 404 lo incorpora también.
- Se instaló `@react-bits/PixelSwap-JS-CSS` mediante shadcn. El registro no declara dependencias. La adaptación conserva la matemática visual de React Bits pero usa dos capturas nativas y una máscara de hasta 220 cuadrados, animada con GSAP, evitando cientos de clones de toda la aplicación y de sus canvas.
- La página sigue siendo HTML accesible e interactivo; la captura solo existe durante el cambio. El tema final se aplica también fuera del viewport, y fotos/logos mantienen sus colores.
- Movimiento reducido y navegadores sin View Transitions reciben el cambio inmediato. Se cancela la captura al navegar, desplazar, redimensionar u ocultar la pestaña.
- Validación: lint, typecheck, build y 27 pruebas Playwright aprobadas. Axe revisa ambos temas en las cinco rutas y 404; responsive en 375/390/768/1024/1440 px. Mosaico intermedio revisado visualmente en 390 y 1440 px; se cubren persistencia, clics rápidos, navegación, resize, movimiento reducido y API ausente/fallida. Capturas en `artifacts/screenshots/pixel-swap-*.png`.

## Descarga de CV en Inicio
- Se incorpora el PDF real aportado por el usuario, `docs/DemianPieres.pdf`, sin extraer ni modificar sus datos personales.
- `/cv` sirve ese mismo archivo con Content-Type PDF y Content-Disposition attachment. Next incluye el original en el tracing de esa ruta para el despliegue; no se mantiene una segunda copia.
- Botón/enlace exclusivo de Inicio, mediante el slot opcional `beforeNav` del shell, centrado encima del navbar. En tablet (768–1100 px), el conjunto pasa debajo del retrato para no cubrir el rostro; desktop y móvil conservan el navbar sobre la foto. Referencia de Uiverse.io por nazar-gavrylyk, adaptada con CSS aislado y GSAP; no requiere styled-components.
- Se sustituye el checkbox decorativo por un enlace de descarga accesible, operativo por teclado y sin JavaScript. La animación no retrasa la descarga ni afirma que se completó: el navegador gestiona el guardado.
- Validación: lint, build, typecheck y suite de 34 pruebas aprobados; siete pruebas de CV repetidas tras el ajuste tablet. Descarga comparada byte por byte con el PDF original, teclado, repetición, movimiento reducido, ausencia de JavaScript y ambos temas en 375/390/768/1024/1440 px. Revisión visual de capturas y comprobación del PDF en el tracing del build.

## Primera portada real de Inicio
- El usuario reemplaza Learnlogicify por **eCOMERCE-Web inteligente** y aporta `docs/PortadaEcomerce.png`. Se importa el asset original desde el modelo de proyectos y se muestra con next/image. Quedan tres portadas pendientes.
- No se añaden enlaces ni datos del proyecto que aún no fueron proporcionados.


## Acabado de la portada eCOMERCE
- Se eleva la calidad de next/image a 95 para las portadas reales, conservando imágenes responsive y lazy loading. El original no se modifica ni se genera detalle nuevo: los textos pequeños del diseño siguen sujetos a la resolución de la imagen y al tamaño de la tarjeta.
- Sombra suave, reflejo y hover GSAP sobre el contenedor de la portada, separado del reveal por scroll del artículo para evitar conflictos. Sin nuevas dependencias; respeta movimiento reducido y dispositivos táctiles.
- Validación: build, lint y typecheck; 12 pruebas existentes de Inicio/tema y dos pruebas específicas de portada aprobadas (estas últimas repetidas tras el ajuste final de movimiento reducido). Revisión de capturas desktop en ambos temas y móvil; se verifica calidad 95, hover reversible y ausencia de inclinación táctil.
