# UXUI_IMPLEMENTATION.md

## Archivos detectados
El proyecto contiene referencias y assets en `UXui/`:
- Inicio: `Inicio (1).png`
- Skills: `Skills.png`
- Navbar: `Navbar.png`
- Retrato hero: `Fotofondoinicio.png`
- Linux/pingüino: `linux.png`
- Logos: HTML5, JavaScript, TypeScript, Next.js, React, Tailwind, Python, C, C++, MongoDB, PostgreSQL, MySQL, Node.js, Express, Docker, Git, Figma, AWS, Vercel y otros assets existentes.

## Estrategia de reproducción fiel
1. No usar el screenshot completo como background de la página.
2. Reconstruir la estructura en HTML/CSS/React.
3. Usar screenshots solo como referencia visual.
4. Usar assets de `UXui/` directamente.
5. Comparar la implementación contra la referencia a igual viewport.
6. Iterar espaciado, tipografía, radios, tamaños y alineaciones hasta minimizar diferencias.

## Referencia Inicio
Elementos principales observados:
- Hero de gran ancho con retrato monocromático/gris.
- Navbar flotante centrado sobre el límite inferior del hero.
- Sección de presentación a dos columnas.
- Encabezado muy grande "Algunos de Mis Trabajos...".
- Grilla 2x2 de proyectos destacados en desktop.
- CTA pequeño centrado para explorar más.
- Sección de contacto amplia con círculo azul CTA.
- Footer/cierre de alto impacto, invertido negro/blanco, con tipografía enorme.

La implementación debe conservar esta jerarquía y ritmo vertical.

## Referencia Skills
Elementos principales observados:
- Fondo negro dominante.
- Microcopy en esquinas superiores.
- Título enorme centrado: "Habilidades que alimentan mi pasión".
- Navbar centrado bajo el título.
- Grilla editorial tipo masonry con cards gris oscuro.
- Cards con iconos circulares y descripciones.
- CTA de contacto sobre fondo negro.
- Cierre invertido blanco con gran tipografía negra.

## Secciones sin Figma
Para Projects, About y Resume:
- Reutilizar escala tipográfica, espaciado, radios y relaciones de contraste ya definidas.
- Crear algo nuevo, pero que parezca diseñado en el mismo sistema.
- Usar la skill UI/UX Pro Max para evaluar patrones, accesibilidad y coherencia.
- No permitir que la skill cambie la identidad visual principal.

## Mobile
Como las referencias disponibles son principalmente desktop/high-res:
- Derivar mobile manteniendo la misma identidad.
- Hero: crop responsivo de la imagen, manteniendo rostro como focal point.
- Navbar: conservar todos los destinos; si no cabe cómodamente, usar una solución compacta/scroll horizontal o barra inferior flotante que mantenga el lenguaje visual.
- Projects: 1 columna.
- Skills: 1 columna o 2 columnas en tablets según ancho.
- Titulares: `clamp()` y line-height ajustado para evitar cortes.
- CTA circular: escalar sin invadir el texto.

## Pixel fidelity
No perseguir fidelidad mediante `position:absolute` global y coordenadas fijas. La meta es reproducir la composición usando layout moderno y robusto.
