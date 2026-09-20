# IMPLEMENTATION_PLAN.md

## Fase 0 — Auditoría y setup
- Revisar árbol completo del repo.
- Leer referencias `UXui/` y todos los `.md`.
- Verificar skill UI/UX Pro Max.
- Inicializar/ajustar Next.js + TypeScript + Tailwind v4.
- Instalar GSAP, @gsap/react, Lenis y utilidades acordadas.
- Crear tokens globales y shell base.

## Fase 1 — Sistema base
- Layout global.
- Tipografía.
- Navbar reutilizable.
- Contenedor responsive.
- CTA de contacto reutilizable.
- Footer/cierre editorial reutilizable.
- Sistema de datos.

## Fase 2 — Inicio pixel-faithful
- Implementar `Inicio (1).png` por bloques.
- Integrar retrato provisto.
- Proyectos destacados.
- Animaciones GSAP.
- Validación visual desktop y mobile.

## Fase 3 — Skills pixel-faithful
- Implementar `Skills.png`.
- Reutilizar logos provistos.
- Masonry/grid responsive.
- Animaciones por grupos con ScrollTrigger.
- Validación visual.

## Fase 4 — Projects
- Diseñar con el mismo ADN visual.
- Cards y/o case studies.
- Conservar continuidad con home.
- No inventar contenido faltante.

## Fase 5 — About
- Composición editorial.
- Integrar pingüino Linux con intención visual.
- Animaciones suaves/experimentales.

## Fase 6 — Resume
- Timeline académica y laboral.
- Estructura lista para datos reales.
- Animaciones de progresión por scroll.

## Fase 7 — Refinamiento
- Responsive 375/390/768/1024/1440.
- `prefers-reduced-motion`.
- Teclado/focus.
- Optimización de imágenes.
- Lazy loading.
- Revisar CLS/LCP/INP.
- Eliminar animaciones redundantes.
- Browser smoke tests.
- Comparación visual final con Figma.

## Definition of Done
- Inicio y Skills son visualmente muy cercanos a Figma.
- Todas las rutas funcionan.
- Navbar navega y muestra estado activo.
- GitHub y LinkedIn abren correctamente.
- No hay datos personales inventados.
- No hay errores de consola.
- Mobile se siente diseñado, no adaptado a último momento.
- Motion reducido funciona.
- Performance razonable incluso con animaciones.
