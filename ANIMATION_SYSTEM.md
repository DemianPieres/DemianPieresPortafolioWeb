# ANIMATION_SYSTEM.md

## Dirección
Las animaciones deben hacer que el portfolio se sienta premium, técnico y memorable. Deben reforzar narrativa, jerarquía y navegación; no ser ruido constante.

Motor principal: **GSAP**.

## Reglas técnicas
- Usar `@gsap/react` y `useGSAP` para scope y cleanup.
- Registrar plugins una sola vez.
- Animar preferentemente `transform` y `opacity`.
- Evitar animar propiedades de layout en loops (`top`, `left`, `width`, etc.) salvo casos controlados.
- Usar `will-change` de forma temporal o selectiva.
- Destruir ScrollTriggers al desmontar componentes.
- Sin listeners duplicados entre navegaciones.
- Sin animaciones que provoquen hydration mismatch.
- Respetar `prefers-reduced-motion`: mostrar estado final o versión reducida.

## Lenis + ScrollTrigger
Si se usa Lenis, sincronizarlo con ScrollTrigger y GSAP ticker. Debe existir una única instancia global.
En dispositivos móviles de bajo rendimiento, degradar la intensidad o desactivar smooth scroll si mejora UX.

## Lenguaje de movimiento
### Hero Inicio
- Entrada cinematográfica muy breve: retrato + máscara/clip + tipografía.
- Movimiento sutil de profundidad/parallax, no exagerado.
- Navbar aparece con scale/opacity y micro rebote controlado.
- El retrato debe conservar nitidez y no sufrir deformaciones.

### Navbar
- Microinteracciones magnéticas suaves en desktop.
- Estado activo animado mediante fondo/círculo que se desplaza o transforma.
- Iconos con pequeñas respuestas de hover.
- En touch no depender de hover.

### Texto
- Revelados por línea/palabra solo en encabezados importantes.
- Stagger breve.
- No animar cada párrafo del sitio.

### Projects
- Entrada por scroll con stagger.
- Imagen puede usar clip reveal, scale 1.03→1 o parallax interno leve.
- Hover: desplazamiento sutil de imagen/flecha y cambio de contraste.
- Transición al detalle opcional; evitar una transición pesada que empeore navegación.

### Skills
- Cards entran por grupos siguiendo la composición del masonry.
- Logos pueden tener micro-rotación/scale o brillo al hover, sin parecer arcade.
- Mantener el fondo negro estable para que el contenido sea protagonista.

### CTA de contacto
- El círculo azul puede reaccionar con magnetismo, escala y desplazamiento interno del texto.
- Debe mantener un comportamiento estable y accesible con teclado.

### Secciones nuevas
- `/projects`: scroll storytelling, cards expansivas o transición editorial.
- `/about`: puede usar el pingüino Linux como recurso interactivo/parallax.
- `/resume`: timeline con progresión por scroll y líneas que se dibujan/progresan.

## Presupuesto de movimiento
- Preferir 60fps.
- En mobile: reducir parallax, blur, sombras animadas y cantidad simultánea de elementos.
- Lazy load para cualquier escena 3D o asset pesado.
- No bloquear el contenido esperando una intro larga.

## Duraciones orientativas
- Microinteraction: 0.18–0.35 s
- Reveal: 0.5–0.9 s
- Sección hero/cinemática: 0.8–1.4 s
- Ease preferido: `power3.out`, `power4.out`, o curvas equivalentes; variar solo con intención.

## Criterio final
Si una animación llama más la atención que el contenido durante demasiado tiempo, probablemente está sobrediseñada.
