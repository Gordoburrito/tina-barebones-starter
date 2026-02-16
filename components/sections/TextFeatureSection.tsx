import type { BlockTextFeatureData } from "../../types/site";
import styles from "./TextFeatureSection.module.sass";

interface TextFeatureSectionProps {
  section: BlockTextFeatureData;
}

export default function TextFeatureSection({ section }: TextFeatureSectionProps) {
  return (
    <section id={section.sectionId} className={styles["text-feature"]}>
      <div className={styles["text-feature__container"]}>
        <div className={styles["text-feature__heading-col"]}>
          <h2 className={styles["text-feature__title"]} data-reveal="title">
            {section.title}
          </h2>
        </div>

        <div className={styles["text-feature__content-col"]}>
          <div className={styles["text-feature__content"]}>
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={`${section.sectionId || section.title}-text-${index}`}
                className={styles["text-feature__text"]}
                data-reveal="fade"
                data-reveal-delay={`${index * 80}`}
              >
                {paragraph.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
