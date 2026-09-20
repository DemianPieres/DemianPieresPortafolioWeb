# TECH_STACK.md

## Stack decidido
El portfolio prioriza animaciones complejas, control visual fino, rendimiento y compatibilidad con Vercel.

### Core
- **Next.js 16.x (App Router)**
- **React 19.x**
- **TypeScript** con `strict: true`
- **Tailwind CSS v4** para layout/utilidades + CSS custom properties/global CSS para detalles de dirección de arte
- **Vercel** como plataforma de deploy

### Animación
- **GSAP 3** como motor principal
- **@gsap/react** para integración segura con React (`useGSAP` y cleanup)
- **ScrollTrigger** para storytelling y animaciones ligadas al scroll
- **Lenis** para smooth scrolling cuando mejore la experiencia, sincronizado con ScrollTrigger

No sumar Framer Motion como motor paralelo salvo un motivo técnico excepcional y documentado.

### UI
- Componentes propios. No usar un kit visual que fuerce una estética genérica.
- **Lucide React** solo para iconos utilitarios que no existan como assets.
- `next/image` para raster images.
- `next/font` para fuentes.

### Opcional / fase avanzada
- **Three.js + React Three Fiber + Drei** únicamente si una escena 3D aporta valor real a una sección y no compromete performance móvil.
- Si se usa 3D, preferir `.glb` optimizado y cargarlo de forma diferida.

### Calidad y validación
- ESLint.
- Playwright para smoke tests y, si el entorno lo permite, screenshots de comparación visual.
- Lighthouse / Web Vitals como control de rendimiento.

## Decisiones arquitectónicas
- App Router.
- Server Components por defecto.
- Client Components solo en islas interactivas/animadas.
- Encapsular animaciones GSAP en componentes/hooks específicos.
- Evitar convertir toda la app en `use client`.
- Mantener los datos en archivos TypeScript separados (`data/`).
- Mantener tokens visuales como CSS variables (`--bg`, `--fg`, `--muted`, `--accent`, espacios, radios, etc.).

## Dependencias sugeridas
```bash
npm install gsap @gsap/react lenis lucide-react clsx tailwind-merge
```

Agregar Three/R3F únicamente cuando exista una implementación concreta:
```bash
npm install three @react-three/fiber @react-three/drei
```

## Skill UI/UX Pro Max
Instalación recomendada para Codex CLI desde la raíz del proyecto:
```bash
npx ui-ux-pro-max-cli init --ai codex
```
La instalación debería crear la skill compatible con Codex bajo `.agents/skills/`.

La skill es una herramienta de apoyo. Para Inicio y Skills, la referencia Figma tiene prioridad sobre cualquier recomendación automática de estilo.
