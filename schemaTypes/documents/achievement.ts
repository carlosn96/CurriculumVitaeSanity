import {defineField, defineType} from 'sanity'

export const achievement = defineType({
  name: 'achievement',
  title: 'Logros',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Logro', value: 'achievement'},
          {title: 'Publicación', value: 'publication'},
        ],
      },
      initialValue: 'achievement',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organización',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (rule) => rule.min(1900).max(2100),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'type',
      year: 'year',
    },
    prepare(selection) {
      const {title, subtitle, year} = selection
      return {
        title,
        subtitle: [subtitle, year].filter(Boolean).join(' · '),
      }
    },
  },
})
