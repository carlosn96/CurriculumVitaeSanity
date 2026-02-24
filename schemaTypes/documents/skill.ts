import {defineField, defineType} from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Habilidad',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'skillCategory'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre de icono o clase de librería (opcional).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title.es',
    },
  },
})
