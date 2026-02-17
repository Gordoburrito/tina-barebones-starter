export interface SiteSubLink {
  label: string;
  path: string;
  hash?: string;
}

export interface SiteLink extends SiteSubLink {
  external?: boolean;
  children?: SiteSubLink[];
}

export interface ActionButton {
  label?: string;
  path?: string;
  hash?: string;
  ariaLabel?: string;
  style?: "primary" | "secondary";
}

export interface SocialLink {
  icon: "facebook" | "twitter" | "instagram" | "google" | "yelp";
  href: string;
  ariaLabel: string;
}

export interface SiteGlobal {
  companyName: string;
  email: string;
  phoneNumber: string;
  phoneHref: string;
  phoneAria: string;
  logo: {
    src: string;
    alt: string;
  };
  primaryCta: ActionButton;
  navLinks: SiteLink[];
  footerLinks: SiteLink[];
  socialLinks: SocialLink[];
  location: {
    street: string;
    suite?: string;
    cityState: string;
    latitude: string;
    longitude: string;
    directionsHref: string;
    directionsLabel: string;
    locationEmail: string;
    hours: Array<{
      day: string;
      time: string;
    }>;
  };
  theme: {
    colors: {
      primary: string;
      accent: string;
      text: string;
      bg1: string;
      bg2: string;
      secondary: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
  };
  accessibilityLinkLabel: string;
  copyright: string;
}

export interface HeroSectionData {
  _template: "hero";
  sectionId?: string;
  title: string;
  bodyText?: string;
  mediaImage: string;
  mediaAlt: string;
  button?: ActionButton;
}

export interface BlockTextFeatureData {
  _template: "block_text_fh";
  sectionId?: string;
  title: string;
  paragraphs: Array<{
    text: string;
  }>;
}

export interface FeatureRowItem {
  title: string;
  icon: "tooth-check" | "tooth-stars" | "tooth-two-v1";
  text: string;
}

export interface FeatureRowSectionData {
  _template: "multi_item_row";
  sectionId?: string;
  title: string;
  items: FeatureRowItem[];
  cta?: ActionButton;
}

export interface ImageTextParagraph {
  heading?: string;
  text: string;
}

export interface ImageTextSectionData {
  _template: "image_text";
  sectionId?: string;
  title: string;
  paragraphs: ImageTextParagraph[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  buttons?: ActionButton[];
}

export interface MasonryGridItem {
  title: string;
  image: string;
  imageAlt: string;
  path: string;
  hash?: string;
}

export interface MasonryGridSectionData {
  _template: "block_masonary_grid";
  sectionId?: string;
  title: string;
  introParagraphs: Array<{
    text: string;
  }>;
  items: MasonryGridItem[];
  cta?: ActionButton;
}

export interface TestimonialItem {
  author: string;
  testimonial: string;
}

export interface TestimonialSectionData {
  _template: "multi_item_testimonial";
  sectionId?: string;
  title: string;
  reviewText: string;
  reviewLinks: SocialLink[];
  testimonials: TestimonialItem[];
}

export interface ContactFormInputField {
  _template: "input_field";
  fieldId?: string;
  label: string;
  name: string;
  inputType: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
  width?: "full" | "half";
  autoComplete?: string;
}

export interface ContactFormTextareaField {
  _template: "textarea_field";
  fieldId?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  width?: "full" | "half";
}

export interface ContactFormCheckboxOption {
  label: string;
  value: string;
  defaultChecked?: boolean;
}

export interface ContactFormCheckboxGroupField {
  _template: "checkbox_group";
  fieldId?: string;
  label: string;
  name: string;
  required?: boolean;
  options: ContactFormCheckboxOption[];
}

export interface ContactFormConsentCheckboxField {
  _template: "consent_checkbox";
  fieldId?: string;
  name: string;
  label: string;
  required?: boolean;
}

export type ContactFormField =
  | ContactFormInputField
  | ContactFormTextareaField
  | ContactFormCheckboxGroupField
  | ContactFormConsentCheckboxField;

export interface ContactFormSectionData {
  _template: "contact_form";
  sectionId?: string;
  title: string;
  introText?: string;
  formAriaLabel?: string;
  submitLabel: string;
  formFields: ContactFormField[];
}

export interface BannerSectionData {
  _template: "multi_use_banner";
  sectionId?: string;
  variant: "social_block" | "text_block";
  title: string;
  text?: string;
  socialLinks?: SocialLink[];
  button?: ActionButton;
  backgroundMode: "has_image" | "has_background";
  backgroundColor?: "" | "bg1" | "bg2" | "secondary" | "primary";
  backgroundImage?: string;
  backgroundImageAlt?: string;
  centered?: boolean;
  largeTitle?: boolean;
  textColor?: "" | "primary" | "secondary" | "text" | "white";
}

export type HomeSection =
  | HeroSectionData
  | BlockTextFeatureData
  | FeatureRowSectionData
  | ImageTextSectionData
  | MasonryGridSectionData
  | TestimonialSectionData
  | ContactFormSectionData
  | BannerSectionData;

export interface HomePage {
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  sections: HomeSection[];
}
