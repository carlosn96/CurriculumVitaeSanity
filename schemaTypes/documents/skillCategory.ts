import {defineField, defineType} from 'sanity'

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Categoría de habilidad',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'order',
    },
    prepare(selection) {
      const {title, subtitle} = selection

      return {
        title,
        subtitle: typeof subtitle === 'number' ? `Orden: ${subtitle}` : undefined,
      }
    },
  },
})
