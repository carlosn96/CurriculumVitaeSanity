# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

Este repositorio contiene la configuración y esquemas para un Studio de Sanity orientado a un currículum/portafolio (multilenguaje) optimizado para producción.

**Resumen rápido**
- **Propósito:** Gestionar el contenido de un CV/portfolio con soporte de i18n al nivel de campo, esquema para perfil singleton, experiencia, educación, habilidades y logros/publicaciones.
- **Stack:** Sanity v5, TypeScript en esquemas, import scripts con `sanity exec`.

**Estructura clave**
- `schemaTypes/objects`: tipos reutilizables (`localeString`, `localeText`).
- `schemaTypes/documents`: documentos principales (`profile`, `experience`, `education`, `skillCategory`, `skill`, `achievement`).
- `locales/{es,en}`: archivos JSON fuente usados por el importador.
- `scripts/import-locales.mjs`: script para poblar el dataset desde `locales`.

**Requisitos**
- Node.js 18+ (o LTS reciente)
- `npm` o `pnpm`
- `sanity` CLI instalado globalmente o disponible en `node_modules`

Instalación
```bash
npm install
```

Variables de entorno
- Crea `.env` con las variables mínimas:

```bash
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2026-02-23
SANITY_APP_ID=yourAppId
```

Desarrollo
```bash
npm run dev
```

Importar contenido desde `locales`
- Para poblar/actualizar el dataset con los JSON locales:

```bash
sanity exec ./scripts/import-locales.mjs --with-user-token
```

Notas sobre el importador
- El script crea/actualiza documentos para `profile`, `experience`, `education`, `skillCategory`, `skill` y `achievement`.
- La publicación académica se coloca en `achievement` (tipo `publication`).
- Las habilidades de `Communication & Media` se mapearon como `skill` bajo las categorías `management` y `digital` para preservar la jerarquía visual.

Orden personalizado de la experiencia
- El campo `order` en `schemaTypes/documents/experience.ts` es editable desde Studio (`Orden personalizado`).
- Para mostrar la experiencia en frontend, consulta ordenando por `order asc` y como respaldo `startDate desc`.

Despliegue
```bash
sanity deploy
```

Buenas prácticas y recomendaciones
- Modelado: usar `localeString`/`localeText` para traducciones a nivel de campo.
- Singletons: `profile` está configurado como único documento y bloquea creación múltiple desde la estructura del Studio.
- Backups: exportar datos periódicamente o usar `sanity dataset export` antes de cambios masivos.
- CI: Mantén `scripts/import-locales.mjs` versionado para reconstrucciones reproducibles.

Extensiones útiles
- Considere añadir un `.env.example` con variables vacías para el repositorio público.
- Añadir validaciones de contenido más estrictas en los esquemas si el frontend depende de campos concretos.

Soporte
- Archivo principal de esquemas: [schemaTypes/index.ts](schemaTypes/index.ts)
- Importador: [scripts/import-locales.mjs](scripts/import-locales.mjs)
- Si quieres que añada `socialLinks` automáticos desde `.env` o extienda `achievement` con `url`/`evidence` lo puedo implementar.
