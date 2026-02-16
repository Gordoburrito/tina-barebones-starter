/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Site Global",
  name: "site_global",
  path: "content/site",
  format: "json",
  match: {
    include: "global",
  },
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "string",
      name: "companyName",
      label: "Company Name",
      required: true,
    },
    {
      type: "string",
      name: "email",
      label: "Primary Email",
      required: true,
    },
    {
      type: "string",
      name: "phoneNumber",
      label: "Phone Number",
      required: true,
    },
    {
      type: "string",
      name: "phoneHref",
      label: "Phone Link (tel:)",
      required: true,
    },
    {
      type: "string",
      name: "phoneAria",
      label: "Phone aria-label text",
      required: true,
    },
    {
      type: "object",
      name: "logo",
      label: "Logo",
      fields: [
        {
          type: "image",
          name: "src",
          label: "Logo Image",
          required: true,
        },
        {
          type: "string",
          name: "alt",
          label: "Logo Alt",
          required: true,
        },
      ],
    },
    {
      type: "object",
      name: "primaryCta",
      label: "Primary CTA",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
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
        {
          type: "string",
          name: "ariaLabel",
          label: "aria-label",
          required: true,
        },
        {
          type: "string",
          name: "style",
          label: "Style",
          options: ["primary", "secondary"],
          required: true,
        },
      ],
    },
    {
      type: "object",
      name: "navLinks",
      label: "Header Links",
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
          name: "path",
          label: "Path",
          required: true,
        },
        {
          type: "object",
          name: "children",
          label: "Sub Links",
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
      ],
    },
    {
      type: "object",
      name: "footerLinks",
      label: "Footer Links",
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
          name: "path",
          label: "Path",
          required: true,
        },
        {
          type: "string",
          name: "hash",
          label: "Hash",
        },
        {
          type: "boolean",
          name: "external",
          label: "External",
        },
      ],
    },
    {
      type: "object",
      name: "socialLinks",
      label: "Social Links",
      list: true,
      fields: [
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
      ],
    },
    {
      type: "object",
      name: "location",
      label: "Location",
      fields: [
        {
          type: "string",
          name: "street",
          label: "Street",
          required: true,
        },
        {
          type: "string",
          name: "suite",
          label: "Suite",
        },
        {
          type: "string",
          name: "cityState",
          label: "City / State",
          required: true,
        },
        {
          type: "string",
          name: "latitude",
          label: "Latitude",
          required: true,
        },
        {
          type: "string",
          name: "longitude",
          label: "Longitude",
          required: true,
        },
        {
          type: "string",
          name: "directionsHref",
          label: "Directions URL",
          required: true,
        },
        {
          type: "string",
          name: "directionsLabel",
          label: "Directions Label",
          required: true,
        },
        {
          type: "string",
          name: "locationEmail",
          label: "Location Email",
          required: true,
        },
        {
          type: "object",
          name: "hours",
          label: "Hours",
          list: true,
          fields: [
            {
              type: "string",
              name: "day",
              label: "Day",
              required: true,
            },
            {
              type: "string",
              name: "time",
              label: "Time",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "theme",
      label: "Theme",
      fields: [
        {
          type: "object",
          name: "colors",
          label: "Colors",
          fields: [
            {
              type: "string",
              name: "primary",
              label: "Primary",
              required: true,
            },
            {
              type: "string",
              name: "accent",
              label: "Accent",
              required: true,
            },
            {
              type: "string",
              name: "text",
              label: "Text",
              required: true,
            },
            {
              type: "string",
              name: "bg1",
              label: "Background 1",
              required: true,
            },
            {
              type: "string",
              name: "bg2",
              label: "Background 2",
              required: true,
            },
            {
              type: "string",
              name: "secondary",
              label: "Secondary",
              required: true,
            },
          ],
        },
        {
          type: "object",
          name: "fonts",
          label: "Fonts",
          fields: [
            {
              type: "string",
              name: "body",
              label: "Body Font",
              required: true,
            },
            {
              type: "string",
              name: "heading",
              label: "Heading Font",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "string",
      name: "accessibilityLinkLabel",
      label: "Accessibility Link Label",
      required: true,
    },
    {
      type: "string",
      name: "copyright",
      label: "Copyright",
      required: true,
    },
  ],
};
