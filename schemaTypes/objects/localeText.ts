import {defineField, defineType} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Rich text por idioma',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'en',
      title: 'Inglés',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
