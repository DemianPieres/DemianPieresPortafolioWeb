# Prompt inicial para Codex / GPT-6 Astra

Quiero que desarrolles este portfolio de principio a fin utilizando el repositorio actual como fuente de verdad.

## Paso 1: audita antes de modificar
Primero inspecciona el árbol completo del proyecto y lee, en este orden:
1. `AGENTS.md`
2. todos los demás `.md` de contexto del repositorio
3. la carpeta `UXui/`
4. la carpeta `img/`

Debes abrir y analizar visualmente como referencias obligatorias:
- `UXui/Inicio (1).png`
- `UXui/Skills.png`
- `UXui/Navbar.png`

Y debes reutilizar directamente los assets existentes, especialmente:
- `UXui/Fotofondoinicio.png`
- `UXui/linux.png`
- todos los logos de tecnologías presentes en `UXui/`

## Skill UI/UX Pro Max
Verifica si la skill `ui-ux-pro-max` está disponible para Codex en `.agents/skills/`. Úsala en las tareas de diseño, implementación y revisión UI/UX.

IMPORTANTE: para Inicio y Skills, la skill NO tiene autoridad para rediseñar la referencia. Las pantallas Figma exportadas son la fuente visual de verdad. Usa la skill para calidad, coherencia, responsive, accesibilidad y para diseñar las pantallas que todavía no tienen Figma.

Si la skill no está instalada, indícamelo explícitamente y muestra el comando recomendado para instalarla desde la raíz:
`npx ui-ux-pro-max-cli init --ai codex`
No inventes que la skill está activa si no puedes verificarlo.

## Objetivo visual
Quiero una experiencia moderna, premium, técnica y muy llamativa. Blanco, negro y grises son la base, con acentos puntuales según Figma. Quiero animaciones grandes y detalladas, pero con criterio: deben reforzar el storytelling y no sacrificar performance, accesibilidad o legibilidad.

Las páginas ya diseñadas en Figma deben ser una copia fiel. No uses las capturas como backgrounds: reconstruye la UI con React/CSS y usa los assets originales.

## Stack obligatorio
Usa la arquitectura definida en `TECH_STACK.md`:
- Next.js 16.x App Router
- React 19.x
- TypeScript strict
- Tailwind CSS v4 + CSS variables/global CSS cuando sea necesario
- GSAP + @gsap/react + ScrollTrigger
- Lenis sincronizado con GSAP cuando aporte valor
- Lucide solo para iconografía utilitaria sin asset propio
- Vercel-ready

No uses Framer Motion como motor paralelo.

## Rutas
Implementa:
- `/` Inicio
- `/skills`
- `/projects`
- `/about`
- `/resume`

Navbar:
1. Inicio
2. Skills
3. Proyectos
4. Sobre mí — pingüino Linux central
5. Información académica y laboral — icono documento
6. GitHub → https://github.com/DemianPieres
7. LinkedIn → https://www.linkedin.com/in/demianpieres/

GitHub y LinkedIn deben abrir en una pestaña nueva de forma segura.

## Pantallas sin Figma
Projects, About y Resume todavía no tienen interfaz completa. Debes diseñarlas igualmente, pero tienen que parecer parte exacta del mismo sistema visual de Inicio y Skills.

No inventes experiencia laboral, estudios, empresas, clientes, métricas o credenciales. Si falta información factual, crea la estructura de datos y deja TODO/placeholders claramente identificados.

## Animaciones
GSAP es el motor principal. Implementa un sistema coherente siguiendo `ANIMATION_SYSTEM.md`.
Quiero, donde tenga sentido:
- hero reveals
- parallax sutil
- stagger de textos/cards
- ScrollTrigger
- microinteracciones del navbar
- CTA magnético en desktop
- transiciones de proyectos
- progresión/timeline en resume
- interacciones del pingüino en about

Respeta `prefers-reduced-motion` y reduce complejidad en móviles.

## Responsive
La web debe verse diseñada tanto en desktop como en mobile. Valida al menos 375/390, 768, 1024 y 1440 px.
No resuelvas responsive escalando proporcionalmente el desktop. Recompón grids, tipografía, spacing y navbar cuando sea necesario.

## Método de trabajo
1. Resume en pocas líneas lo que detectaste en repo y referencias.
2. Propón un plan de implementación por fases, corto y ejecutable.
3. Empieza a implementar inmediatamente sin esperar confirmación, salvo que exista un bloqueo real.
4. Después de cada pantalla principal, ejecuta lint/build y corrige errores.
5. Si tienes acceso a navegador/screenshot tooling, compara la implementación con las referencias y realiza iteraciones visuales.
6. Mantén un registro breve de decisiones no obvias.
7. Al final entrega un resumen de lo implementado, deuda pendiente real y cualquier dato que necesites que yo complete.

## Restricciones
- No sobrearquitectures.
- No uses un UI kit genérico que cambie la estética.
- No uses screenshots como interfaz final.
- No inventes datos.
- No sacrifiques accesibilidad por animación.
- No llenes todo de efectos; concentra el impacto en momentos clave.

Comienza ahora con la auditoría del repositorio y luego implementa Fase 0 y Fase 1.
