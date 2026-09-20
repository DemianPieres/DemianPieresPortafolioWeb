# PROJECT_BRIEF.md

## Proyecto
Portfolio.Dev — portafolio personal de Demian Pieres.

## Objetivo
Crear un portfolio de desarrollador con fuerte dirección de arte, animaciones detalladas y una experiencia visual que llame la atención desde el primer segundo. Debe comunicar capacidad técnica y sensibilidad de diseño.

## Personalidad visual
- Moderna, editorial, técnica y minimalista.
- Alto contraste.
- Base cromática: blanco, negro y grises.
- Usar color de forma puntual como acento, siguiendo las referencias de Figma (por ejemplo el azul eléctrico del CTA y los colores propios de logos/tecnologías).
- Evitar gradientes genéricos "AI", exceso de glassmorphism y decoración sin intención.
- Mucho aire, tipografía grande, composiciones asimétricas y cambios de fondo blanco/negro para ritmo visual.
- Microtexto técnico/monoespaciado puede usarse como recurso secundario.

## Rutas / secciones
### `/` — Inicio
Debe reproducir fielmente `UXui/Inicio (1).png`.
Incluye:
- Hero con retrato.
- Navbar flotante.
- Presentación personal.
- Bloque de proyectos destacados.
- CTA para ver todos los proyectos.
- CTA de contacto.
- Cierre visual/editorial.

### `/skills` — Skills
Debe reproducir fielmente `UXui/Skills.png`.
- Hero/título de skills.
- Navbar coherente.
- Grilla/masonry editorial de categorías de habilidades.
- Uso directo de logos provistos.
- CTA final de contacto.
- Cierre visual/editorial.

### `/projects` — Proyectos
No existe referencia Figma completa todavía. Diseñar siguiendo estrictamente el lenguaje visual de Inicio/Skills.
- Vista general de proyectos.
- Cards grandes y visuales.
- Filtros solo si agregan valor; no complicar por defecto.
- Posibilidad de abrir detalle/case study por proyecto.
- Inicio muestra una selección de proyectos destacados y enlaza aquí.

### `/about` — Sobre mí
Corresponde al pingüino Linux del centro del navbar.
- Mantener estética editorial/técnica.
- Usar `UXui/linux.png` cuando sea apropiado.
- Puede incorporar una composición más personal, intereses y filosofía de trabajo.
- No inventar biografía que no esté disponible.

### `/resume` — Información académica y laboral
Corresponde al icono de documento del navbar.
- Diseño tipo timeline/editorial/documental.
- Separar experiencia y formación.
- Preparar estructura de datos, pero no inventar fechas, empresas, títulos o instituciones.

### Enlaces externos
- GitHub: https://github.com/DemianPieres
- LinkedIn: https://www.linkedin.com/in/demianpieres/
Abrir en nueva pestaña con atributos seguros.

## Navbar
Referencia visual obligatoria: `UXui/Navbar.png`.
Orden conceptual:
1. Inicio
2. Skills
3. Proyectos
4. Sobre mí (pingüino Linux, botón central visualmente destacado)
5. Información académica/laboral
6. GitHub
7. LinkedIn

Mantener el lenguaje de cápsula oscura, botones circulares y estado activo claro. La posición exacta debe respetar el Figma; si se vuelve sticky/fixed, no debe alterar la composición visual.

## Proyectos visibles actualmente en la referencia de Inicio
Usar como seed visual mientras no exista un dataset definitivo:
- Learnlogicify Landing Page
- Winzee Web Chat application
- ChatGPT clone
- Gemini Clone

Centralizar el contenido en un archivo de datos para que pueda editarse luego sin tocar componentes.
