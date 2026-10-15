import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artículo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().error("El título es obligatorio"),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("El slug es obligatorio"),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .error("La descripción es obligatoria y admite hasta 160 caracteres"),
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().error("La fecha de publicación es obligatoria"),
    }),
    defineField({
      name: "cover",
      title: "Portada",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("El texto alternativo es obligatorio"),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      validation: (Rule) => Rule.required().error("El contenido es obligatorio"),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
            { title: "Título 4", value: "h4" },
            { title: "Cita", value: "blockquote" },
          ],
          lists: [
            { title: "Lista con viñetas", value: "bullet" },
            { title: "Lista numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
              { title: "Código en línea", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "Enlace",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.required()
                        .uri({ scheme: ["http", "https", "mailto"] })
                        .error("Introduce una URL válida"),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "code",
          title: "Bloque de código",
          options: {
            withFilename: true,
            languageAlternatives: [
              { title: "Bash", value: "bash" },
              { title: "Shell", value: "sh" },
              { title: "JSON", value: "json" },
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "TSX", value: "tsx" },
              { title: "Markdown", value: "markdown" },
              { title: "Texto", value: "text" },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          title: "Imagen",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("El texto alternativo es obligatorio"),
            }),
          ],
        }),
        defineArrayMember({
          name: "motionVideo",
          title: "Video animado",
          type: "object",
          fields: [
            defineField({
              name: "video",
              title: "Video",
              type: "string",
              options: {
                list: [
                  { title: "Agente de QA (flujo)", value: "qa-agent-flow" },
                ],
              },
              validation: (Rule) =>
                Rule.required().error("El video es obligatorio"),
            }),
            defineField({
              name: "caption",
              title: "Pie",
              type: "string",
            }),
            defineField({
              name: "label",
              title: "Descripción para lectores de pantalla",
              type: "string",
              validation: (Rule) =>
                Rule.required().error(
                  "La descripción para lectores de pantalla es obligatoria",
                ),
            }),
          ],
          preview: {
            select: { video: "video", caption: "caption" },
            prepare({ video, caption }) {
              return {
                title: caption || "Video animado",
                subtitle: video || "Sin video seleccionado",
              };
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Fecha de publicación (reciente primero)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "cover" },
  },
});
