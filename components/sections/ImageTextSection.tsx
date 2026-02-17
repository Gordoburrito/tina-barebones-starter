import Image from "next/image";
import type { ImageTextSectionData } from "../../types/site";
import CtaLink from "../ui/CtaLink";
import { resolveStinsonMediaSrc } from "../ui/media";
import styles from "./ImageTextSection.module.sass";

interface ImageTextSectionProps {
  section: ImageTextSectionData;
}

export default function ImageTextSection({ section }: ImageTextSectionProps) {
  return (
    <section id={section.sectionId} className={styles["image-text"]}>
      <div
        className={`${styles["image-text__container"]} ${section.reverse ? styles["image-text__container--reverse"] : ""}`}
      >
        <div className={styles["image-text__media-col"]}>
          <div className={styles["image-text__media-wrap"]} data-reveal="fade">
            <Image
              src={resolveStinsonMediaSrc(section.image)}
              alt={section.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className={styles["image-text__image"]}
            />
          </div>
        </div>

        <div className={styles["image-text__content-col"]}>
          <div className={styles["image-text__title-wrap"]} data-reveal="title">
            <h2 className={styles["image-text__title"]}>{section.title}</h2>
            <div className={styles["image-text__title-underline"]} aria-hidden="true" />
          </div>

          <div className={styles["image-text__copy"]}>
            {section.paragraphs.map((paragraph, index) => (
              <div
                key={`${section.sectionId || section.title}-copy-${index}`}
                className={styles["image-text__paragraph"]}
                data-reveal="fade"
                data-reveal-delay={`${120 + index * 80}`}
              >
                {paragraph.heading ? (
                  <h3 className={styles["image-text__paragraph-heading"]}>{paragraph.heading}</h3>
                ) : null}
                <p>{paragraph.text}</p>
              </div>
            ))}
          </div>

          {section.buttons?.length ? (
            <div className={styles["image-text__buttons"]} data-reveal="small" data-reveal-delay="260">
              {section.buttons.map((button, index) => {
                const buttonStyle =
                  button.style === "primary"
                    ? styles["image-text__button--primary"]
                    : styles["image-text__button--secondary"];

                return (
                  <CtaLink
                    key={`${button.path || "link"}-${index}`}
                    button={button}
                    className={`${styles["image-text__button"]} ${buttonStyle}`}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
