const buttonFields = [
  {
    type: "string",
    name: "label",
    label: "Label",
  },
  {
    type: "string",
    name: "path",
    label: "Path",
  },
  {
    type: "string",
    name: "hash",
    label: "Hash",
  },
  {
    type: "string",
    name: "ariaLabel",
    label: "aria-label",
  },
  {
    type: "string",
    name: "style",
    label: "Style",
    options: ["primary", "secondary"],
  },
];

const socialLinkFields = [
  {
    type: "string",
    name: "icon",
    label: "Icon",
    options: ["facebook", "twitter", "instagram", "google", "yelp"],
    required: true,
  },
  {
    type: "string",
    name: "href",
    label: "URL",
    required: true,
  },
  {
    type: "string",
    name: "ariaLabel",
    label: "aria-label",
    required: true,
  },
];

const contactFormFieldTemplates = [
  {
    name: "input_field",
    label: "Input Field",
    fields: [
      {
        type: "string",
        name: "fieldId",
        label: "Field ID",
      },
      {
        type: "string",
        name: "label",
        label: "Label",
        required: true,
      },
      {
        type: "string",
        name: "name",
        label: "Name",
        required: true,
      },
      {
        type: "string",
        name: "inputType",
        label: "Input Type",
        options: ["text", "email", "tel"],
        required: true,
      },
      {
        type: "string",
        name: "placeholder",
        label: "Placeholder",
      },
      {
        type: "boolean",
        name: "required",
        label: "Required",
      },
      {
        type: "string",
        name: "width",
        label: "Width",
        options: ["full", "half"],
      },
      {
        type: "string",
        name: "autoComplete",
        label: "Autocomplete",
      },
    ],
  },
  {
    name: "textarea_field",
    label: "Textarea Field",
    fields: [
      {
        type: "string",
        name: "fieldId",
        label: "Field ID",
      },
      {
        type: "string",
        name: "label",
        label: "Label",
        required: true,
      },
      {
        type: "string",
        name: "name",
        label: "Name",
        required: true,
      },
      {
        type: "string",
        name: "placeholder",
        label: "Placeholder",
      },
      {
        type: "boolean",
        name: "required",
        label: "Required",
      },
      {
        type: "number",
        name: "rows",
        label: "Rows",
      },
      {
        type: "string",
        name: "width",
        label: "Width",
        options: ["full", "half"],
      },
    ],
  },
  {
    name: "checkbox_group",
    label: "Checkbox Group",
    fields: [
      {
        type: "string",
        name: "fieldId",
        label: "Field ID",
      },
      {
        type: "string",
        name: "label",
        label: "Legend Label",
        required: true,
      },
      {
        type: "string",
        name: "name",
        label: "Name",
        required: true,
      },
      {
        type: "boolean",
        name: "required",
        label: "Required",
      },
      {
        type: "object",
        name: "options",
        label: "Options",
        list: true,
        fields: [
          {
            type: "string",
            name: "label",
            label: "Label",
            required: true,
          },
          {
            type: "string",
            name: "value",
            label: "Value",
            required: true,
          },
          {
            type: "boolean",
            name: "defaultChecked",
            label: "Checked by Default",
          },
        ],
      },
    ],
  },
  {
    name: "consent_checkbox",
    label: "Consent Checkbox",
    fields: [
      {
        type: "string",
        name: "fieldId",
        label: "Field ID",
      },
      {
        type: "string",
        name: "name",
        label: "Name",
        required: true,
      },
      {
        type: "string",
        name: "label",
        label: "Consent Text",
        required: true,
        ui: {
          component: "textarea",
        },
      },
      {
        type: "boolean",
        name: "required",
        label: "Required",
      },
    ],
  },
];

/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Landing Page",
  name: "landing_page",
  path: "content/landing",
  format: "json",
  match: {
    include: "home",
  },
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => "/",
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "string",
      name: "slug",
      label: "Slug",
      required: true,
    },
    {
      type: "string",
      name: "seoTitle",
      label: "SEO Title",
      required: true,
    },
    {
      type: "string",
      name: "seoDescription",
      label: "SEO Description",
      required: true,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "sections",
      label: "Sections",
      list: true,
      templates: [
        {
          name: "hero",
          label: "Hero",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "string",
              name: "bodyText",
              label: "Body Text",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "image",
              name: "mediaImage",
              label: "Hero Image",
              required: true,
            },
            {
              type: "string",
              name: "mediaAlt",
              label: "Image Alt",
              required: true,
            },
            {
              type: "object",
              name: "button",
              label: "Button",
              fields: buttonFields,
            },
          ],
        },
        {
          name: "block_text_fh",
          label: "Text Feature",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "object",
              name: "paragraphs",
              label: "Paragraphs",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "text",
                  label: "Text",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "multi_item_row",
          label: "Feature Row",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "object",
              name: "items",
              label: "Items",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Title",
                  required: true,
                },
                {
                  type: "string",
                  name: "icon",
                  label: "Icon",
                  options: ["tooth-check", "tooth-stars", "tooth-two-v1"],
                  required: true,
                },
                {
                  type: "string",
                  name: "text",
                  label: "Text",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              type: "object",
              name: "cta",
              label: "CTA Button",
              fields: buttonFields,
            },
          ],
        },
        {
          name: "image_text",
          label: "Image + Text",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "object",
              name: "paragraphs",
              label: "Paragraphs",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading (Optional)",
                },
                {
                  type: "string",
                  name: "text",
                  label: "Text",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              type: "image",
              name: "image",
              label: "Image",
              required: true,
            },
            {
              type: "string",
              name: "imageAlt",
              label: "Image Alt",
              required: true,
            },
            {
              type: "boolean",
              name: "reverse",
              label: "Reverse Layout",
            },
            {
              type: "object",
              name: "buttons",
              label: "Buttons",
              list: true,
              fields: buttonFields,
            },
          ],
        },
        {
          name: "block_masonary_grid",
          label: "Masonry Grid",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "object",
              name: "introParagraphs",
              label: "Intro Paragraphs",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "text",
                  label: "Text",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              type: "object",
              name: "items",
              label: "Grid Items",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Title",
                  required: true,
                },
                {
                  type: "image",
                  name: "image",
                  label: "Image",
                  required: true,
                },
                {
                  type: "string",
                  name: "imageAlt",
                  label: "Image Alt",
                  required: true,
                },
                {
                  type: "string",
                  name: "path",
                  label: "Path",
                  required: true,
                },
                {
                  type: "string",
                  name: "hash",
                  label: "Hash",
                },
              ],
            },
            {
              type: "object",
              name: "cta",
              label: "CTA Button",
              fields: buttonFields,
            },
          ],
        },
        {
          name: "multi_item_testimonial",
          label: "Testimonials",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "string",
              name: "reviewText",
              label: "Review Prompt",
              required: true,
            },
            {
              type: "object",
              name: "reviewLinks",
              label: "Review Links",
              list: true,
              fields: socialLinkFields,
            },
            {
              type: "object",
              name: "testimonials",
              label: "Testimonials",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "author",
                  label: "Author",
                  required: true,
                },
                {
                  type: "string",
                  name: "testimonial",
                  label: "Testimonial",
                  required: true,
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "contact_form",
          label: "Contact Form",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "string",
              name: "introText",
              label: "Intro Text",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "string",
              name: "formAriaLabel",
              label: "Form aria-label",
            },
            {
              type: "string",
              name: "submitLabel",
              label: "Submit Label",
              required: true,
            },
            {
              type: "object",
              name: "formFields",
              label: "Form Fields",
              list: true,
              templates: contactFormFieldTemplates,
            },
          ],
        },
        {
          name: "multi_use_banner",
          label: "Banner",
          fields: [
            {
              type: "string",
              name: "sectionId",
              label: "Section ID",
            },
            {
              type: "string",
              name: "variant",
              label: "Variant",
              options: ["social_block", "text_block"],
              required: true,
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true,
            },
            {
              type: "string",
              name: "text",
              label: "Text",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "object",
              name: "socialLinks",
              label: "Social Links",
              list: true,
              fields: socialLinkFields,
            },
            {
              type: "object",
              name: "button",
              label: "Button",
              fields: buttonFields,
            },
            {
              type: "string",
              name: "backgroundMode",
              label: "Background Mode",
              options: ["has_image", "has_background"],
              required: true,
            },
            {
              type: "string",
              name: "backgroundColor",
              label: "Background Color Token",
              options: ["", "bg1", "bg2", "secondary", "primary"],
            },
            {
              type: "image",
              name: "backgroundImage",
              label: "Background Image",
            },
            {
              type: "string",
              name: "backgroundImageAlt",
              label: "Background Image Alt",
            },
            {
              type: "boolean",
              name: "centered",
              label: "Centered Content",
            },
            {
              type: "boolean",
              name: "largeTitle",
              label: "Large Title",
            },
            {
              type: "string",
              name: "textColor",
              label: "Text Color Token",
              options: ["", "primary", "secondary", "text", "white"],
            },
          ],
        },
      ],
    },
  ],
};
