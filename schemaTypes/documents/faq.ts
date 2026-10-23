import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Pregunta Frecuente (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Servicios Profesionales', value: 'services'},
          {title: 'General / Consultoría', value: 'general'},
        ],
      },
      initialValue: 'services',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'question.es',
      subtitle: 'category',
    },
  },
})
