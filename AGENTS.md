# AGENTS.md — Portfolio.Dev

## Misión
Construir el portafolio personal de Demian Pieres con una implementación visual de alta fidelidad, moderna, memorable, rápida y responsive. La estética y la interacción son parte central del producto, no un detalle secundario.

## Orden de autoridad / fuente de verdad
Ante cualquier conflicto, respetar este orden:
1. La solicitud actual del usuario.
2. Las referencias visuales en `UXui/`.
3. Los assets reales existentes en `UXui/` e `img/`.
4. Estos archivos Markdown de contexto.
5. Las recomendaciones de la skill UI/UX Pro Max.
6. Convenciones genéricas de UI.

La skill puede ayudar a completar, revisar y elevar el diseño, pero **no debe rediseñar las pantallas de Figma ya definidas**.

## Referencias visuales obligatorias
- `UXui/Inicio (1).png` → fuente de verdad visual para Inicio.
- `UXui/Skills.png` → fuente de verdad visual para Skills.
- `UXui/Navbar.png` → fuente de verdad visual para el navbar flotante.
- `UXui/Fotofondoinicio.png` → asset de hero/retrato.
- `UXui/linux.png` → asset del pingüino/Linux usado para Sobre mí / navbar.
- Logos de tecnologías dentro de `UXui/` → reutilizarlos directamente; no recrearlos si el asset ya existe.

## Principios innegociables
- Priorizar fidelidad visual sobre reinterpretación creativa en Inicio y Skills.
- No convertir componentes normales en imágenes: botones, cards, textos, layouts y navegación deben ser HTML/CSS/React reales.
- No recortar logos desde screenshots. Usar los assets provistos.
- No inventar experiencia laboral, formación académica, métricas, clientes ni proyectos inexistentes.
- Todo contenido que aún no tenga datos reales debe quedar modelado para completarse fácilmente y usar placeholders explícitos/TODO si es necesario.
- Mantener accesibilidad, semántica, teclado y `prefers-reduced-motion`.
- El sitio debe sentirse premium y experimental, pero nunca a costa de legibilidad o performance.
- No usar Framer Motion como segundo motor principal. GSAP es la fuente de verdad para animación compleja.

## Calidad esperada
- TypeScript estricto.
- Componentes pequeños y reutilizables cuando tenga sentido, sin sobregeneralizar.
- Datos de proyectos, skills, experiencia y formación separados de la presentación.
- Sin errores de consola, hydration warnings o fugas de ScrollTrigger.
- Responsive real, no simplemente una reducción proporcional del desktop.
- Revisar visualmente en 375/390, 768, 1024 y 1440 px.
- Optimizar imágenes y animaciones para evitar CLS, jank y bloqueos del main thread.

## Comportamiento del agente
Antes de implementar:
1. Auditar el repositorio y los archivos `UXui/`.
2. Leer todos los `.md` de contexto.
3. Verificar si existe `.agents/skills/ui-ux-pro-max/` y usar la skill para tareas UI/UX.
4. Proponer un plan breve por fases y luego ejecutar.
5. No detenerse por decisiones menores que puedan inferirse de las referencias; documentar la inferencia.
6. Preguntar solamente ante bloqueos reales o datos personales/factuales que no deban inventarse.
