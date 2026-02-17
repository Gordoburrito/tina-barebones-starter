import Image from "next/image";
import type { BannerSectionData } from "../../types/site";
import CtaLink from "../ui/CtaLink";
import Icon from "../ui/Icon";
import { resolveStinsonMediaSrc } from "../ui/media";
import styles from "./BannerSection.module.sass";

interface BannerSectionProps {
  section: BannerSectionData;
}

const colorTokenMap: Record<string, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  text: "var(--color-text)",
  bg1: "var(--color-bg1)",
  bg2: "var(--color-bg2)",
  white: "#ffffff",
};

const textColorClassMap: Record<string, string> = {
  white: styles["banner__content--text-white"],
  text: styles["banner__content--text-text"],
  primary: styles["banner__content--text-primary"],
  secondary: styles["banner__content--text-secondary"],
};

export default function BannerSection({ section }: BannerSectionProps) {
  const style: Record<string, string> = {};
  const backgroundImage =
    section.backgroundMode === "has_image" && typeof section.backgroundImage === "string"
      ? resolveStinsonMediaSrc(section.backgroundImage)
      : undefined;
  const hasImageBackground = Boolean(backgroundImage);

  if (section.backgroundMode === "has_background" && section.backgroundColor) {
    style.backgroundColor = colorTokenMap[section.backgroundColor] || "var(--color-bg2)";
  }

  if (section.textColor) {
    style.color = colorTokenMap[section.textColor] || "inherit";
  }

  const buttonStyle =
    section.button?.style === "secondary"
      ? styles["banner__button--secondary"]
      : styles["banner__button--primary"];

  const textColorClass = section.textColor ? textColorClassMap[section.textColor] || "" : "";

  return (
    <section
      id={section.sectionId}
      className={`${styles.banner} ${hasImageBackground ? styles["banner--has-image"] : styles["banner--has-background"]}`}
      style={style as any}
    >
      {hasImageBackground && backgroundImage ? (
        <div className={styles["banner__image-wrap"]}>
          <Image
            src={backgroundImage}
            alt={section.backgroundImageAlt || ""}
            fill
            sizes="100vw"
            className={styles["banner__image"]}
          />
        </div>
      ) : null}

      {hasImageBackground ? <div className={styles["banner__overlay"]} /> : null}

      <div className={styles["banner__container"]}>
        <div
          className={`${styles["banner__content"]} ${section.centered ? styles["banner__content--centered"] : ""} ${textColorClass}`}
        >
          <h2
            className={`${styles["banner__title"]} ${section.largeTitle ? styles["banner__title--large"] : ""}`}
            data-reveal="title"
          >
            {section.title}
          </h2>

          {section.text ? (
            <p className={styles["banner__text"]} data-reveal="fade" data-reveal-delay="140">
              {section.text}
            </p>
          ) : null}

          {section.variant === "social_block" && section.socialLinks?.length ? (
            <ul className={styles["banner__social-list"]} data-reveal="small" data-reveal-delay="220">
              {section.socialLinks.map((link) => (
                <li key={`${link.icon}-${link.href}`} className={styles["banner__social-item"]}>
                  <a
                    className={styles["banner__social-link"]}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={link.ariaLabel}
                  >
                    <Icon name={link.icon} className={styles["banner__social-icon"]} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {section.variant === "text_block" ? (
            <div className={styles["banner__text-block"]} data-reveal="small" data-reveal-delay="220">
              <CtaLink button={section.button} className={`${styles["banner__button"]} ${buttonStyle}`} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
