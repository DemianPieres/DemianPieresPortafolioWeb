# Portfolio de Demian Pieres

Implementadas **Fases 0, 1 y 2** de `IMPLEMENTATION_PLAN.md`. Inicio incluye retrato, presentación, proyectos destacados responsive y animaciones GSAP, junto con el contacto y cierre compartidos. Las portadas faltantes tienen placeholders explícitos y los proyectos siguen como borradores por confirmar. Las otras cuatro rutas conservan sus contenidos provisionales; el siguiente trabajo es **Fase 3 — Skills**.

## Desarrollo

Requiere Node.js >=20.9 (verificado con 22.23.2).

```bash
npm ci
npm run dev
```

Abrir http://localhost:3000.

Inicio incluye un selector claro/oscuro arriba a la derecha del retrato. Guarda la elección en el navegador, invierte la paleta neutra de Home y respeta movimiento reducido. El retrato, los logos de marca y el acento azul conservan sus colores.

El icono solicitado se instaló como componente local con `npx shadcn@latest add @icons0/icon-park-outline/dark-mode`. `components.json` configura ese registro; no se agregó una dependencia de UI en ejecución.

`DemianPieres.Dev` aparece frente al selector con [ParticleText de React Bits](https://reactbits.dev/text-animations/particle-text), variante JS-CSS, instalada mediante `npx shadcn@latest add @react-bits/ParticleText-JS-CSS`. Las partículas se dispersan al pasar el cursor y vuelven a formar el nombre; adaptan su color al tema. El registro no requiere dependencias adicionales. El componente local incluye ajustes de accesibilidad, tamaño y pausa del renderizado; ver `docs/DECISIONS.md` antes de reinstalarlo con sobrescritura.

## Validación

```bash
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

Playwright levanta el build de producción en el puerto 3100. Revisa rutas, navegación por teclado, tamaños táctiles, overflow, consola, movimiento reducido y accesibilidad automática. También verifica los borradores de Inicio, navegación sin JavaScript y revelados después de cambiar preferencias y navegar entre rutas. Genera capturas en `artifacts/screenshots/` para los cinco anchos requeridos, después de activar los revelados de las cards. La revisión automática no reemplaza la revisión manual de accesibilidad.

## Estructura

- `src/app/`: App Router, fuentes, tokens globales y rutas.
- `src/components/`: navbar, contenedor, shell, contacto, CTA magnético y cierre editorial.
- `src/components/home/`: proyectos destacados (servidor) y animaciones de Inicio (isla cliente); estilos exclusivos en `src/app/home.css`.
- `src/data/`: contenido tipado, navegación y registro de assets.
- `src/lib/gsap.ts`: registro único de GSAP, ScrollTrigger y useGSAP.
- `UXui/`: originales, importados directamente con dimensiones y optimización de Next Image. Las capturas Figma nunca se importan como UI.
- `tests/`: smoke tests del sistema compartido y comportamiento de Inicio.

## Contenido pendiente

Editar `src/data/profile.ts`, `projects.ts`, `skills.ts`, `education.ts` y `experience.ts`. Los proyectos de la referencia son borradores, no trabajos confirmados. Email transcrito de Figma; teléfono sin publicar. Revisar `docs/DECISIONS.md` para auditoría y decisiones.

## Deploy

Compatible con el preset Next.js de Vercel, raíz del proyecto actual, build `npm run build`. No requiere variables de entorno ni servicios externos. No se realizó un deploy. `next/font` descarga Geist durante el build y lo sirve localmente en ejecución.

Configuración basada en la [instalación oficial de Next.js](https://nextjs.org/docs/app/getting-started/installation) y la [integración oficial GSAP/React](https://github.com/greensock/react).
