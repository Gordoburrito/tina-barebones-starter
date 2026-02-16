import type { FeatureRowSectionData } from "../../types/site";
import CtaLink from "../ui/CtaLink";
import Icon from "../ui/Icon";
import styles from "./FeatureRowSection.module.sass";

interface FeatureRowSectionProps {
  section: FeatureRowSectionData;
}

export default function FeatureRowSection({ section }: FeatureRowSectionProps) {
  const buttonStyle =
    section.cta?.style === "primary"
      ? styles["feature-row__button--primary"]
      : styles["feature-row__button--secondary"];

  return (
    <section id={section.sectionId} className={styles["feature-row"]}>
      <div className={styles["feature-row__container"]}>
        <h2 className={styles["feature-row__title"]} data-reveal="title">
          {section.title}
        </h2>

        <div className={styles["feature-row__items"]}>
          {section.items.map((item, index) => (
            <article key={item.title} className={styles["feature-row__item"]} data-items={section.items.length}>
              <Icon name={item.icon} className={styles["feature-row__icon"]} />
              <div
                className={styles["feature-row__item-content"]}
                data-reveal="fade"
                data-reveal-delay={`${120 + index * 90}`}
              >
                <h3 className={styles["feature-row__item-title"]}>{item.title}</h3>
                <p className={styles["feature-row__item-text"]}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles["feature-row__button-wrap"]} data-reveal="small" data-reveal-delay="320">
          <CtaLink button={section.cta} className={`${styles["feature-row__button"]} ${buttonStyle}`} />
        </div>
      </div>
    </section>
  );
}
