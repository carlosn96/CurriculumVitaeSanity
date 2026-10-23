import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Servicio',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Desarrollo Web & Tiendas Online', value: 'web_ecommerce'},
          {title: 'Sistemas a Medida & Automatización', value: 'custom_software'},
          {title: 'Gestión & Optimización de Bases de Datos', value: 'database'},
          {title: 'Mantenimiento de Cómputo & Servidores', value: 'tech_support'},
          {title: 'Invitaciones Digitales & Productos Web', value: 'digital_products'},
          {title: 'Redes Sociales & Transmisiones en Vivo', value: 'media_streaming'},
          {title: 'Música para Misas & Celebraciones', value: 'ceremonial_music'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Titular / Resumen breve',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción completa',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deliverables',
      title: 'Entregables y Alcance',
      type: 'object',
      fields: [
        defineField({
          name: 'es',
          title: 'Español',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'en',
          title: 'Inglés',
          type: 'array',
          of: [{type: 'string'}],
        }),
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Tecnologías / Herramientas',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'icon',
      title: 'Clase de Icono (FontAwesome)',
      type: 'string',
      initialValue: 'fas fa-briefcase',
    }),
    defineField({
      name: 'officialIcon',
      title: 'Icono Oficial de Tecnología (Simple Icons / React Icons)',
      type: 'string',
      description: 'Identificador oficial de icono (ej. SiReact, SiWordpress, SiNginx).',
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Etiqueta destacada (opcional)',
      type: 'localeString',
    }),
    defineField({
      name: 'featured',
      title: '¿Destacar en catálogo?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'externalUrl',
      title: 'Enlace externo (ej. https://invite.joannesystem.com)',
      type: 'url',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje sugerido para WhatsApp',
      type: 'localeString',
      validation: (rule) => rule.required(),
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
      title: 'title.es',
      subtitle: 'category',
    },
  },
})
