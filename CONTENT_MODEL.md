# CONTENT_MODEL.md

## Objetivo
Separar datos de UI para que el portfolio pueda mantenerse sin tocar componentes.

## Estructura sugerida
```text
src/
  data/
    projects.ts
    skills.ts
    profile.ts
    experience.ts
    education.ts
    navigation.ts
```

## Projects
Cada proyecto debería poder definir:
- `slug`
- `title`
- `shortDescription`
- `longDescription`
- `coverImage`
- `gallery`
- `technologies`
- `featured`
- `liveUrl`
- `repositoryUrl`
- `year`
- `status`

No inventar URLs o detalles si no existen.

## Skills
Agrupar por categorías coherentes con la referencia Figma, por ejemplo:
- Front-End Development
- Styling & Design
- Programming Languages
- Back-End Development
- Web Animations
- Database Management
- Core Computer Science Concepts
- Cloud & Deployment
- Mobile App Development
- Version Control & Collaboration
- UI/UX Design
- Personal Development
- Testing & Debugging

Reutilizar los logos reales disponibles en `UXui/`.

## Profile
Centralizar:
- Nombre
- Rol/título profesional
- Bio corta
- Bio extendida
- Email
- Teléfono (solo si el usuario desea publicarlo)
- GitHub
- LinkedIn
- Localización (si el usuario decide mostrarla)

## Experience / Education
Crear el esquema, no inventar contenido. Si faltan datos, mantener arrays vacíos o placeholders explícitos que el usuario pueda reemplazar.
