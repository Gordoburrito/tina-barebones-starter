import Link from "next/link";
import type { SiteGlobal } from "../../types/site";
import Icon from "../ui/Icon";
import styles from "./Footer.module.sass";

interface FooterProps {
  global: SiteGlobal;
}

function normalizeHref(path: string, hash?: string) {
  return `${path}${hash || ""}`;
}

export default function Footer({ global }: FooterProps) {
  const allFooterLinks = [...global.navLinks, ...global.footerLinks];

  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["site-footer__inner"]}>
        <div className={styles["site-footer__top-row"]}>
          <ul className={styles["site-footer__menu"]}>
            {allFooterLinks.map((item) => {
              const href = normalizeHref(item.path, item.hash);

              if (item.external || href.startsWith("http://") || href.startsWith("https://")) {
                return (
                  <li key={`${item.label}-${href}`} className={styles["site-footer__menu-item"]}>
                    <a className={styles["site-footer__link"]} href={href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={`${item.label}-${href}`} className={styles["site-footer__menu-item"]}>
                  <Link className={styles["site-footer__link"]} href={href}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles["site-footer__bottom-row"]}>
          <div className={styles["site-footer__meta"]}>
            <p className={styles["site-footer__meta-item"]}>{global.copyright}</p>
            <p className={styles["site-footer__meta-item"]}>
              Online Advantage by{" "}
              <a
                className={styles["site-footer__link"]}
                href="https://www.roostergrin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rooster Grin Media
              </a>
            </p>
            <Link className={styles["site-footer__link"]} href="/accessibility">
              {global.accessibilityLinkLabel}
            </Link>
            <span className={styles["site-footer__link"]} tabIndex={0} role="button" aria-label="Click for Accessibility">
              Click for Accessibility
            </span>
          </div>

          <ul className={styles["site-footer__social-list"]}>
            {global.socialLinks.map((link) => (
              <li key={`${link.icon}-${link.href}`} className={styles["site-footer__social-list-item"]}>
                <a
                  className={styles["site-footer__social-link"]}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.ariaLabel}
                >
                  <Icon name={link.icon} className={styles["site-footer__social-icon"]} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
