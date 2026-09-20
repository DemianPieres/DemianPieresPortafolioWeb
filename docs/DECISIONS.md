# Auditoría y decisiones — Fases 0 y 1

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

## Siguiente trabajo

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
