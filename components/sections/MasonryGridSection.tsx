import Image from "next/image";
import Link from "next/link";
import type { MasonryGridSectionData } from "../../types/site";
import CtaLink from "../ui/CtaLink";
import styles from "./MasonryGridSection.module.sass";

interface MasonryGridSectionProps {
  section: MasonryGridSectionData;
}

function renderTitle(title: string) {
  const marker = " for ";

  if (!title.includes(marker)) {
    return title;
  }

  const [first, ...restParts] = title.split(marker);
  const rest = restParts.join(marker);

  return (
    <>
      {first}
      <span className={styles["masonry-grid__tile-title-block"]}>{`for ${rest}`}</span>
    </>
  );
}

export default function MasonryGridSection({ section }: MasonryGridSectionProps) {
  const buttonStyle =
    section.cta?.style === "secondary"
      ? styles["masonry-grid__button--secondary"]
      : styles["masonry-grid__button--primary"];

  const gridSizeClass = section.items.length === 5 ? styles["masonry-grid__tiles--five"] : styles["masonry-grid__tiles--four"];

  return (
    <section id={section.sectionId} className={styles["masonry-grid"]}>
      <div className={styles["masonry-grid__container"]}>
        <div className={styles["masonry-grid__intro"]}>
          <h2 className={styles["masonry-grid__title"]} data-reveal="title">
            {section.title}
          </h2>
          <div className={styles["masonry-grid__paragraphs"]}>
            {section.introParagraphs.map((paragraph, index) => (
              <p
                key={`${section.sectionId || section.title}-intro-${index}`}
                className={styles["masonry-grid__paragraph"]}
                data-reveal="fade"
                data-reveal-delay={`${index * 80}`}
              >
                {paragraph.text}
              </p>
            ))}
          </div>
          <div data-reveal="small" data-reveal-delay="220">
            <CtaLink button={section.cta} className={`${styles["masonry-grid__button"]} ${buttonStyle}`} />
          </div>
        </div>

        <div className={`${styles["masonry-grid__tiles"]} ${gridSizeClass}`}>
          {section.items.map((item, index) => {
            const href = `${item.path}${item.hash || ""}`;

            return (
              <Link
                key={`${item.path}-${item.title}-${index}`}
                href={href}
                className={styles["masonry-grid__tile"]}
                data-reveal="fade"
                data-reveal-delay={`${120 + index * 70}`}
              >
                <div className={styles["masonry-grid__tile-image-wrap"]}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className={styles["masonry-grid__tile-image"]}
                  />
                </div>
                <div className={styles["masonry-grid__tile-overlay"]} />
                <div className={styles["masonry-grid__tile-overlay-hover"]} />
                <h3 className={styles["masonry-grid__tile-title"]}>{renderTitle(item.title)}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
