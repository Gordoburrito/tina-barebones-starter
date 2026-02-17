import type { HomeSection } from "../../types/site";
import BannerSection from "./BannerSection";
import ContactFormSection from "./ContactFormSection";
import FeatureRowSection from "./FeatureRowSection";
import HeroSection from "./HeroSection";
import ImageTextSection from "./ImageTextSection";
import MasonryGridSection from "./MasonryGridSection";
import TestimonialSection from "./TestimonialSection";
import TextFeatureSection from "./TextFeatureSection";

interface SectionRendererProps {
  sections: HomeSection[];
}

function readTemplateName(section: any) {
  if (section?._template) {
    return section._template;
  }

  const type = String(section?.__typename || "");

  if (type.endsWith("Hero")) {
    return "hero";
  }

  if (type.endsWith("Block_text_fh")) {
    return "block_text_fh";
  }

  if (type.endsWith("Multi_item_row")) {
    return "multi_item_row";
  }

  if (type.endsWith("Image_text")) {
    return "image_text";
  }

  if (type.endsWith("Block_masonary_grid")) {
    return "block_masonary_grid";
  }

  if (type.endsWith("Multi_item_testimonial")) {
    return "multi_item_testimonial";
  }

  if (type.endsWith("Contact_form")) {
    return "contact_form";
  }

  if (type.endsWith("Multi_use_banner")) {
    return "multi_use_banner";
  }

  return "";
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section: any, index) => {
        const template = readTemplateName(section);
        const key = `${template || section.__typename || "section"}-${section.sectionId || index}`;

        if (template === "hero") {
          return <HeroSection key={key} section={section} />;
        }

        if (template === "block_text_fh") {
          return <TextFeatureSection key={key} section={section} />;
        }

        if (template === "multi_item_row") {
          return <FeatureRowSection key={key} section={section} />;
        }

        if (template === "image_text") {
          return <ImageTextSection key={key} section={section} />;
        }

        if (template === "block_masonary_grid") {
          return <MasonryGridSection key={key} section={section} />;
        }

        if (template === "multi_item_testimonial") {
          return <TestimonialSection key={key} section={section} />;
        }

        if (template === "contact_form") {
          return <ContactFormSection key={key} section={section} />;
        }

        if (template === "multi_use_banner") {
          return <BannerSection key={key} section={section} />;
        }

        return null;
      })}
    </>
  );
}
