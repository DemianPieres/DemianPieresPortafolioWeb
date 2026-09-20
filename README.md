# Portfolio de Demian Pieres

Implementadas **Fase 0 y Fase 1** de `IMPLEMENTATION_PLAN.md`. Las cinco rutas son navegables; sus contenidos completos corresponden a las fases 2–6. Los mensajes provisionales no representan la UI final.

## Desarrollo

Requiere Node.js >=20.9 (verificado con 22.23.2).

```bash
npm ci
npm run dev
```

Abrir http://localhost:3000.

## Validación

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright levanta el build de producción en el puerto 3100. Revisa rutas, navegación por teclado, tamaños táctiles, overflow, consola, movimiento reducido y accesibilidad automática. Genera capturas en `artifacts/screenshots/` para los cinco anchos requeridos. La revisión automática no reemplaza la revisión manual de accesibilidad.

## Estructura

- `src/app/`: App Router, fuentes, tokens globales y rutas.
- `src/components/`: navbar, contenedor, shell, contacto, CTA magnético y cierre editorial.
- `src/data/`: contenido tipado, navegación y registro de assets.
- `src/lib/gsap.ts`: registro único de GSAP, ScrollTrigger y useGSAP.
- `UXui/`: originales, importados directamente con dimensiones y optimización de Next Image. Las capturas Figma nunca se importan como UI.
- `tests/`: smoke tests del sistema compartido.

## Contenido pendiente

Editar `src/data/profile.ts`, `projects.ts`, `skills.ts`, `education.ts` y `experience.ts`. Los proyectos de la referencia son borradores, no trabajos confirmados. Email transcrito de Figma; teléfono sin publicar. Revisar `docs/DECISIONS.md` para auditoría y decisiones.

## Deploy

Compatible con el preset Next.js de Vercel, raíz del proyecto actual, build `npm run build`. No requiere variables de entorno ni servicios externos. No se realizó un deploy. `next/font` descarga Geist durante el build y lo sirve localmente en ejecución.

Configuración basada en la [instalación oficial de Next.js](https://nextjs.org/docs/app/getting-started/installation) y la [integración oficial GSAP/React](https://github.com/greensock/react).
