"use client";

import type { FormEvent } from "react";
import type { ContactFormField, ContactFormSectionData } from "../../types/site";
import styles from "./ContactFormSection.module.sass";

interface ContactFormSectionProps {
  section: ContactFormSectionData;
}

function readFieldTemplate(field: any) {
  if (field?._template) {
    return field._template;
  }

  const type = String(field?.__typename || "");

  if (type.endsWith("Input_field")) {
    return "input_field";
  }

  if (type.endsWith("Textarea_field")) {
    return "textarea_field";
  }

  if (type.endsWith("Checkbox_group")) {
    return "checkbox_group";
  }

  if (type.endsWith("Consent_checkbox")) {
    return "consent_checkbox";
  }

  return "";
}

function toSlug(value?: string, fallback = "field") {
  if (!value) {
    return fallback;
  }

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || fallback;
}

function readFieldId(sectionId: string | undefined, field: any, index: number) {
  const blockId = toSlug(sectionId, "contact-form");
  const localId = toSlug(field?.fieldId || field?.name, `field-${index}`);

  return `${blockId}-${localId}`;
}

function readFieldKey(field: any, index: number) {
  return field?.fieldId || field?.name || `field-${index}`;
}

function readFieldWidthClass(field: any) {
  return field?.width === "half" ? styles.contactForm__fieldWrapHalf : styles.contactForm__fieldWrapFull;
}

function readPlaceholder(label: string, placeholder: string | undefined, isRequired: boolean | undefined) {
  if (placeholder && placeholder.trim().length > 0) {
    return placeholder;
  }

  return isRequired ? `${label} *` : label;
}

export default function ContactFormSection({ section }: ContactFormSectionProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const formFields = section.formFields || [];

  const renderField = (rawField: ContactFormField, index: number) => {
    const template = readFieldTemplate(rawField);
    const field = rawField as any;
    const fieldId = readFieldId(section.sectionId, field, index);
    const fieldKey = readFieldKey(field, index);

    if (template === "input_field") {
      const placeholder = readPlaceholder(field.label, field.placeholder, field.required);

      return (
        <div key={fieldKey} className={`${styles.contactForm__fieldWrap} ${readFieldWidthClass(field)}`}>
          <label className={styles.contactForm__visuallyHidden} htmlFor={fieldId}>
            {field.label}
          </label>
          <input
            id={fieldId}
            name={field.name}
            type={field.inputType || "text"}
            required={Boolean(field.required)}
            autoComplete={field.autoComplete || undefined}
            placeholder={placeholder}
            className={styles.contactForm__input}
          />
        </div>
      );
    }

    if (template === "textarea_field") {
      const placeholder = readPlaceholder(field.label, field.placeholder, field.required);

      return (
        <div key={fieldKey} className={`${styles.contactForm__fieldWrap} ${readFieldWidthClass(field)}`}>
          <label className={styles.contactForm__visuallyHidden} htmlFor={fieldId}>
            {field.label}
          </label>
          <textarea
            id={fieldId}
            name={field.name}
            required={Boolean(field.required)}
            rows={field.rows || 5}
            placeholder={placeholder}
            className={styles.contactForm__textarea}
          />
        </div>
      );
    }

    if (template === "checkbox_group") {
      const options = Array.isArray(field.options) ? field.options : [];
      const legendLabel = field.required ? `${field.label} *` : field.label;

      return (
        <fieldset key={fieldKey} className={`${styles.contactForm__fieldWrap} ${styles.contactForm__fieldWrapFull}`}>
          <legend className={styles.contactForm__legend}>{legendLabel}</legend>
          <div className={styles.contactForm__checkboxGroup}>
            {options.map((option: any, optionIndex: number) => {
              const optionId = `${fieldId}-${toSlug(option?.value, String(optionIndex))}`;

              return (
                <label key={`${fieldKey}-${option?.value || optionIndex}`} htmlFor={optionId} className={styles.contactForm__checkboxLabel}>
                  <input
                    id={optionId}
                    name={field.name}
                    type="checkbox"
                    value={option?.value || ""}
                    defaultChecked={Boolean(option?.defaultChecked)}
                    className={styles.contactForm__checkbox}
                  />
                  <span className={styles.contactForm__checkboxText}>{option?.label || ""}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    }

    if (template === "consent_checkbox") {
      return (
        <div key={fieldKey} className={`${styles.contactForm__fieldWrap} ${styles.contactForm__fieldWrapFull}`}>
          <label htmlFor={fieldId} className={styles.contactForm__consentLabel}>
            <input
              id={fieldId}
              name={field.name}
              type="checkbox"
              required={Boolean(field.required)}
              className={styles.contactForm__checkbox}
            />
            <span className={styles.contactForm__consentText}>{field.label}</span>
          </label>
        </div>
      );
    }

    return null;
  };

  return (
    <section id={section.sectionId} className={styles.contactForm}>
      <div className={styles.contactForm__container}>
        <div className={styles.contactForm__contentColumn}>
          <h2 className={styles.contactForm__title} data-reveal="title">
            {section.title}
          </h2>
          <div className={styles.contactForm__line} aria-hidden="true" />

          {section.introText ? (
            <p className={styles.contactForm__intro} data-reveal="fade" data-reveal-delay="100">
              {section.introText}
            </p>
          ) : null}
        </div>

        <div className={styles.contactForm__formColumn}>
          <form
            className={styles.contactForm__form}
            aria-label={section.formAriaLabel || section.title}
            noValidate
            onSubmit={handleSubmit}
            data-reveal="fade"
            data-reveal-delay="140"
          >
            <div className={styles.contactForm__fields}>{formFields.map((field, index) => renderField(field, index))}</div>

            <div className={styles.contactForm__submitWrap}>
              <button type="submit" className={styles.contactForm__submit}>
                {section.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
