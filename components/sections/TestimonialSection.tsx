"use client";

import { useMemo, useState } from "react";
import type { TestimonialSectionData } from "../../types/site";
import Icon from "../ui/Icon";
import styles from "./TestimonialSection.module.sass";

interface TestimonialSectionProps {
  section: TestimonialSectionData;
}

export default function TestimonialSection({ section }: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const count = section.testimonials.length;

  const activeTestimonial = useMemo(() => {
    if (!count) {
      return null;
    }

    return section.testimonials[activeIndex % count];
  }, [activeIndex, count, section.testimonials]);

  const goNext = () => {
    if (!count) {
      return;
    }

    setActiveIndex((previous) => (previous + 1) % count);
  };

  const goPrev = () => {
    if (!count) {
      return;
    }

    setActiveIndex((previous) => (previous - 1 + count) % count);
  };

  if (!activeTestimonial) {
    return null;
  }

  return (
    <section id={section.sectionId} className={styles.testimonial}>
      <div className={styles["testimonial__gradient"]} />

      <div className={styles["testimonial__container"]}>
        <div className={styles["testimonial__left"]}>
          <div className={styles["testimonial__title-wrap"]}>
            <h2 className={styles["testimonial__title"]} data-reveal="title">
              {section.title}
            </h2>

            <div className={styles["testimonial__stars"]} aria-label="5 stars" role="img" data-reveal="fade" data-reveal-delay="120">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon key={`star-${index}`} name="star" className={styles["testimonial__star"]} />
              ))}
            </div>
          </div>

          <div className={styles["testimonial__review-wrap"]} data-reveal="fade" data-reveal-delay="200">
            <p className={styles["testimonial__review-text"]}>{section.reviewText}</p>

            <ul className={styles["testimonial__review-links"]}>
              {section.reviewLinks.map((link) => (
                <li key={`${link.icon}-${link.href}`} className={styles["testimonial__review-link-item"]}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className={styles["testimonial__review-link"]}
                  >
                    <Icon name={link.icon} className={styles["testimonial__review-icon"]} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles["testimonial__right"]}>
          <div className={styles["testimonial__slider"]} role="region" aria-live="polite" aria-label="testimonial carousel">
            <p className={styles["testimonial__quote"]} data-reveal="fade">
              &ldquo;
              {activeTestimonial.testimonial}
              &rdquo;
            </p>
            <p className={styles["testimonial__author"]} data-reveal="small" data-reveal-delay="80">
              {activeTestimonial.author}
            </p>
          </div>

          <div className={styles["testimonial__lower"]} data-reveal="small" data-reveal-delay="120">
            <div className={styles["testimonial__controls"]}>
              <button
                type="button"
                aria-label="Previous Slide"
                onClick={goPrev}
                className={styles["testimonial__control-btn"]}
              >
                <Icon name="chevron-left" className={styles["testimonial__control-icon"]} />
              </button>

              <button
                type="button"
                aria-label="Next Slide"
                onClick={goNext}
                className={styles["testimonial__control-btn"]}
              >
                <Icon name="chevron-right" className={styles["testimonial__control-icon"]} />
              </button>
            </div>

            <p className={styles["testimonial__pagination"]}>
              {activeIndex + 1} / {count}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
