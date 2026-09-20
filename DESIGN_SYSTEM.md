# DESIGN_SYSTEM.md

## Fuente visual primaria
Derivar medidas finales comparando directamente contra:
- `UXui/Inicio (1).png`
- `UXui/Skills.png`
- `UXui/Navbar.png`

No intentar "mejorar" esas pantallas cambiando su composición. La meta inicial es una copia fiel y responsive.

## Color
Base:
- Negro profundo / fondos oscuros.
- Blanco / fondos claros.
- Escala de grises neutros.
- Azul eléctrico como acento de CTA cuando coincida con Figma.
- Colores de logos de tecnologías se mantienen como identidad de cada tecnología.

Implementar como variables CSS y afinar valores mediante comparación visual.

Ejemplo inicial (ajustable tras comparación con Figma):
```css
:root {
  --color-bg: #ffffff;
  --color-fg: #0a0a0a;
  --color-surface-dark: #1f1f1f;
  --color-muted: #777777;
  --color-line: #b8b8b8;
  --color-accent: #4d5ff5;
}
```

## Tipografía
- Prioridad 1: usar la fuente real de Figma si está disponible en los assets/diseño.
- Si no puede identificarse con certeza, usar **Geist Sans** como fallback principal y **Geist Mono** para microcopy técnico.
- Escalas grandes y fluidas con `clamp()`.
- Evitar tamaños rígidos que solo funcionen a 1920 px.

## Layout
- Diseño editorial con grandes márgenes laterales y mucho espacio negativo.
- Desktop: preservar proporciones del Figma y ajustar a contenedor fluido.
- Tablet/mobile: reorganizar jerarquía, no escalar todo proporcionalmente.
- En mobile, cards de proyectos y skills pasan a una columna cuando sea necesario.
- Usar CSS Grid para grillas editoriales/masonry controlado.

## Cards
Skills:
- Superficies oscuras ligeramente elevadas del fondo negro.
- Radios suaves/grandes como en referencia.
- Iconos dentro de círculos oscuros.
- Títulos claros + descripción secundaria en gris.

Projects:
- Imagen protagonista.
- Radius generoso.
- Título debajo con indicador/flecha circular.
- Hover interactivo sin deformar la composición.

## Navbar
- Cápsula horizontal oscura.
- Botones circulares.
- Activo: círculo claro + icono oscuro.
- Centro Linux: asset del pingüino, con protagonismo visual.
- Mantener hit area >= 44 px.
- Tooltips accesibles en desktop; `aria-label` siempre.

## Responsive obligatorio
Validar al menos:
- 375/390 px
- 768 px
- 1024 px
- 1440 px
- Pantallas grandes sin estirar textos/card widths de forma absurda

## Accesibilidad
- Contraste de texto AA cuando sea razonable sin romper el arte.
- Focus visible.
- HTML semántico.
- Links externos identificables para lectores de pantalla.
- No depender solo del color para indicar estado activo.
