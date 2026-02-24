import {defineField, defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto por idioma',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'Inglés',
      type: 'string',
    }),
  ],
})
