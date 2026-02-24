import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import type {StructureResolver} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['profile'])

const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Perfil')
        .id('profile')
        .child(S.document().schemaType('profile').documentId('profile')),
      ...S.documentTypeListItems().filter((listItem) => !singletonTypes.has(listItem.getId() || '')),
    ])

export default defineConfig({
  name: 'default',
  title: 'CurricumlVitae',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',

  plugins: [structureTool({structure}), visionTool()],

  document: {
    newDocumentOptions: (prev, context) => {
      if (context.creationContext.type === 'global') {
        return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
      }

      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})
