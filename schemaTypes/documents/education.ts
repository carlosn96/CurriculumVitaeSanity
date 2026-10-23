import {defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Educación',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institución',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Educación Técnica', value: 'technical'},
          {title: 'Formación Continua', value: 'continuous'},
          {title: 'Formación en Medios', value: 'media'},
          {title: 'Filosofía y Humanidades', value: 'humanist'},
          {title: 'Intereses e Idiomas', value: 'interests'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Periodo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Detalles',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'institution',
    },
  },
})
