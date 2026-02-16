import Image from "next/image";
import type { HeroSectionData } from "../../types/site";
import CtaLink from "../ui/CtaLink";
import styles from "./HeroSection.module.sass";

interface HeroSectionProps {
  section: HeroSectionData;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const buttonClass =
    section.button?.style === "secondary"
      ? `${styles["hero__button"]} ${styles["hero__button--secondary"]}`
      : `${styles["hero__button"]} ${styles["hero__button--primary"]}`;

  const hasBodyText = Boolean(section.bodyText && section.bodyText.trim().length > 0);

  return (
    <section id={section.sectionId} className={styles.hero}>
      <div className={styles["hero__overlay"]} />

      <div className={styles["hero__image-wrap"]}>
        <Image src={section.mediaImage} alt={section.mediaAlt} fill priority sizes="100vw" className={styles["hero__image"]} />
      </div>

      <div className={styles["hero__container"]}>
        <div className={`${styles["hero__content"]} ${!hasBodyText ? styles["hero__content--title-only"] : ""}`}>
          <h1 className={styles["hero__title"]} data-reveal="title">
            {section.title}
          </h1>
          {hasBodyText ? (
            <p className={styles["hero__text"]} data-reveal="fade" data-reveal-delay="120">
              {section.bodyText}
            </p>
          ) : null}
          <div className={styles["hero__cta"]} data-reveal="small" data-reveal-delay="240">
            <CtaLink button={section.button} className={buttonClass} />
          </div>
        </div>

        <div className={styles["hero__down"]} aria-hidden="true">
          <svg viewBox="0 0 50 50" className={styles["hero__down-icon"]}>
            <path d="M25,0A16.59,16.59,0,0,1,41.56,16.56V33.44a16.56,16.56,0,0,1-33.12,0V16.56A16.59,16.59,0,0,1,25,0Zm0,5A3.07,3.07,0,0,1,28.08,8.1v4.66a3.08,3.08,0,1,1-6.16,0V8.1A3.07,3.07,0,0,1,25,5Zm1,2.05a1.46,1.46,0,0,0-2.49,1v4.66a1.47,1.47,0,0,0,.43,1,1.45,1.45,0,0,0,2.06,0,1.47,1.47,0,0,0,.43-1V8.1a1.49,1.49,0,0,0-.43-1Zm-16,12H39.94V16.56a14.94,14.94,0,0,0-29.88,0Zm29.88,1.62H10.06V33.44a14.94,14.94,0,0,0,29.88,0Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
