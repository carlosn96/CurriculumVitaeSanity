import {defineField, defineType} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experiencia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Puesto',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Empresa',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Fecha de inicio',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Fecha de fin',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
    }),
    defineField({
      name: 'isCurrent',
      title: 'Trabajo actual',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden personalizado',
      type: 'number',
      description: 'Usa este número para ordenar manualmente la experiencia en el frontend.',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'company',
    },
  },
})
