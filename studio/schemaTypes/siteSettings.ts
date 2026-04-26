import {defineArrayMember, defineField, defineType} from "sanity";

export const linkAction = defineType({
  name: "linkAction",
  title: "Link Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
      description: "Examples: #contact, mailto:hello@example.com, https://...",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const heroHighlight = defineType({
  name: "heroHighlight",
  title: "Hero Highlight",
  type: "object",
  fields: [
    defineField({name: "title", title: "Title", type: "string"}),
    defineField({name: "text", title: "Text", type: "string"}),
  ],
});

export const statItem = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  fields: [
    defineField({name: "value", title: "Value", type: "string"}),
    defineField({name: "label", title: "Label", type: "string"}),
  ],
});

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service",
  type: "object",
  fields: [
    defineField({name: "index", title: "Index", type: "string"}),
    defineField({name: "title", title: "Title", type: "string"}),
    defineField({name: "description", title: "Description", type: "text", rows: 4}),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [defineArrayMember({type: "string"})],
    }),
  ],
});

export const consultationOption = defineType({
  name: "consultationOption",
  title: "Consultation Option",
  type: "object",
  fields: [
    defineField({name: "title", title: "Title", type: "string"}),
    defineField({name: "description", title: "Description", type: "string"}),
  ],
});

export const testimonialItem = defineType({
  name: "testimonialItem",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({name: "quote", title: "Quote", type: "text", rows: 5}),
    defineField({name: "author", title: "Author", type: "string"}),
  ],
});

export const aboutNote = defineType({
  name: "aboutNote",
  title: "About Note",
  type: "object",
  fields: [
    defineField({name: "title", title: "Title", type: "string"}),
    defineField({name: "body", title: "Body", type: "text", rows: 4}),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website Content",
  type: "document",
  groups: [
    {name: "global", title: "Global"},
    {name: "hero", title: "Hero"},
    {name: "services", title: "Services"},
    {name: "consultation", title: "Consultation"},
    {name: "testimonials", title: "Testimonials"},
    {name: "about", title: "About"},
    {name: "contact", title: "Contact"},
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      group: "global",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "text",
      rows: 3,
      group: "global",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({name: "eyebrow", title: "Eyebrow", type: "string"}),
        defineField({name: "titlePrefix", title: "Title Prefix", type: "string"}),
        defineField({name: "titleAccent", title: "Title Accent", type: "string"}),
        defineField({name: "titleSuffix", title: "Title Suffix", type: "string"}),
        defineField({name: "text", title: "Hero Text", type: "text", rows: 4}),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: {hotspot: true},
        }),
        defineField({name: "imageAlt", title: "Hero Image Alt Text", type: "string"}),
        defineField({name: "primaryCta", title: "Primary CTA", type: "linkAction"}),
        defineField({name: "secondaryCta", title: "Secondary CTA", type: "linkAction"}),
        defineField({
          name: "highlights",
          title: "Hero Highlights",
          type: "array",
          of: [defineArrayMember({type: "heroHighlight"})],
          validation: (Rule) => Rule.max(2),
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "global",
      of: [defineArrayMember({type: "statItem"})],
    }),
    defineField({
      name: "servicesSection",
      title: "Services Section",
      type: "object",
      group: "services",
      fields: [
        defineField({name: "eyebrow", title: "Eyebrow", type: "string"}),
        defineField({name: "title", title: "Title", type: "string"}),
        defineField({name: "text", title: "Intro Text", type: "text", rows: 4}),
        defineField({
          name: "services",
          title: "Services",
          type: "array",
          of: [defineArrayMember({type: "serviceItem"})],
        }),
      ],
    }),
    defineField({
      name: "consultation",
      title: "Consultation Section",
      type: "object",
      group: "consultation",
      fields: [
        defineField({name: "eyebrow", title: "Eyebrow", type: "string"}),
        defineField({name: "title", title: "Title", type: "string"}),
        defineField({name: "text", title: "Text", type: "text", rows: 4}),
        defineField({
          name: "options",
          title: "Consultation Options",
          type: "array",
          of: [defineArrayMember({type: "consultationOption"})],
        }),
        defineField({
          name: "booking",
          title: "Booking Card",
          type: "object",
          fields: [
            defineField({name: "kicker", title: "Kicker", type: "string"}),
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({name: "text", title: "Text", type: "text", rows: 3}),
            defineField({name: "label", title: "Button Label", type: "string"}),
            defineField({name: "href", title: "Booking URL", type: "string"}),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonialsSection",
      title: "Testimonials Section",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({name: "eyebrow", title: "Eyebrow", type: "string"}),
        defineField({name: "title", title: "Title", type: "string"}),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [defineArrayMember({type: "testimonialItem"})],
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      group: "about",
      fields: [
        defineField({name: "eyebrow", title: "Eyebrow", type: "string"}),
        defineField({name: "title", title: "Title", type: "string"}),
        defineField({name: "text", title: "Text", type: "text", rows: 5}),
        defineField({
          name: "notes",
          title: "About Notes",
          type: "array",
          of: [defineArrayMember({type: "aboutNote"})],
        }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact Section",
      type: "object",
      group: "contact",
      fields: [
        defineField({name: "eyebrow", title: "Eyebrow", type: "string"}),
        defineField({name: "title", title: "Title", type: "string"}),
        defineField({name: "text", title: "Text", type: "text", rows: 4}),
        defineField({name: "email", title: "Email", type: "string"}),
        defineField({name: "location", title: "Location Text", type: "string"}),
        defineField({name: "primaryAction", title: "Primary Button", type: "linkAction"}),
        defineField({name: "secondaryAction", title: "Secondary Button", type: "linkAction"}),
      ],
    }),
  ],
  preview: {
    select: {
      title: "brandName",
      subtitle: "contact.email",
      media: "hero.image",
    },
  },
});
