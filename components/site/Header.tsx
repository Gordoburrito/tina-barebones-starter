"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SiteGlobal, SiteSubLink } from "../../types/site";
import CtaLink from "../ui/CtaLink";
import styles from "./Header.module.sass";

interface HeaderProps {
  global: SiteGlobal;
}

const treatmentFallbackChildren: SiteSubLink[] = [
  { label: "Early Treatment", path: "/treatments", hash: "#early-treatment" },
  { label: "Adult Treatment", path: "/treatments", hash: "#adult-treatment" },
  { label: "Braces", path: "/treatments", hash: "#braces" },
  { label: "Invisalign", path: "/treatments", hash: "#invisalign" },
  { label: "Orthognathic Surgery", path: "/treatments", hash: "#orthognathic-surgery" },
  { label: "Retainers", path: "/treatments", hash: "#retainers" },
  { label: "Technology", path: "/treatments", hash: "#technology" },
];

function buildHref(path: string, hash?: string) {
  const basePath = path || "";
  const anchor = hash || "";

  if (!basePath && !anchor) {
    return "#";
  }

  return `${basePath}${anchor}`;
}

export default function Header({ global }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastScrollY = useRef(0);
  const frameRef = useRef<number | null>(null);
  const desktopNavLinks = global.navLinks.filter((item) => item.path !== "/");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const scrollThreshold = window.innerHeight * 0.1;
    lastScrollY.current = window.scrollY;
    setSolid(window.scrollY > scrollThreshold);

    if (menuOpen) {
      setHidden(false);
      return;
    }

    const applyScrollState = () => {
      frameRef.current = null;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const passedThreshold = currentScrollY > scrollThreshold;

      setSolid(passedThreshold);

      if (Math.abs(delta) < 8) {
        return;
      }

      if (currentScrollY < 140) {
        setHidden(false);
      } else if (delta > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(applyScrollState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`${styles["site-header"]} ${hidden ? styles["site-header--hidden"] : ""} ${solid ? styles["site-header--solid"] : ""}`}
    >
      <div className={styles["site-header__inner"]}>
        <Link className={styles["site-header__logo-link"]} href="/" prefetch={false} aria-label="Home" onClick={closeMenu}>
          <Image
            src={global.logo.src}
            alt={global.logo.alt}
            width={178}
            height={84}
            priority
            className={styles["site-header__logo-image"]}
          />
        </Link>

        <nav className={styles["site-header__desktop-nav"]} aria-label="Primary">
          <ul className={styles["site-header__nav-list"]}>
            {desktopNavLinks.map((item) => {
              const children = resolveChildren(item.label, item.children);
              const hasChildren = children.length > 0;
              const hasVisualCaret = hasChildren || item.label.toLowerCase() === "treatments";

              return (
                <li key={`${item.path}-${item.label}`} className={styles["site-header__nav-item"]}>
                  <div className={styles["site-header__nav-link-wrap"]}>
                    <Link className={styles["site-header__nav-link"]} href={item.path} prefetch={false}>
                      {item.label}
                    </Link>
                    {hasVisualCaret ? (
                      <span className={styles["site-header__nav-caret"]} aria-hidden="true">
                        <svg viewBox="0 0 16 16" className={styles["site-header__nav-caret-icon"]}>
                          <path d="M4 6l4 4 4-4" />
                        </svg>
                      </span>
                    ) : null}
                  </div>

                  {hasChildren ? (
                    <div className={styles["site-header__subnav"]}>
                      {children.map((child) => (
                        <Link
                          key={`${child.path}-${child.hash || ""}-${child.label}`}
                          className={styles["site-header__subnav-link"]}
                          href={buildHref(child.path, child.hash)}
                          prefetch={false}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <CtaLink
            button={global.primaryCta}
            className={`${styles["site-header__cta"]} ${styles["site-header__cta--primary"]}`}
          />
        </nav>

        <button
          type="button"
          className={`${styles["site-header__menu-button"]} ${menuOpen ? styles["site-header__menu-button--open"] : ""}`}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close main menu" : "Open main menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles["site-header__menu-button-bar"]} />
          <span className={styles["site-header__menu-button-bar"]} />
          <span className={styles["site-header__menu-button-bar"]} />
        </button>
      </div>

      <div
        className={`${styles["site-header__drawer"]} ${menuOpen ? styles["site-header__drawer--open"] : ""}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      >
        <div className={styles["site-header__drawer-panel"]} onClick={(event) => event.stopPropagation()}>
          <nav id="primary-navigation" className={styles["site-header__nav"]} aria-label="Primary">
            <ul className={styles["site-header__nav-list"]}>
              {global.navLinks.map((item) => {
                const childLinks = resolveChildren(item.label, item.children);

                return (
                  <li key={`${item.path}-${item.label}`} className={styles["site-header__nav-item"]}>
                    <Link className={styles["site-header__nav-link"]} href={item.path} prefetch={false} onClick={closeMenu}>
                      {item.label}
                    </Link>
                    {childLinks.length ? (
                      <ul className={styles["site-header__mobile-subnav"]}>
                        {childLinks.map((child) => (
                          <li key={`${child.path}-${child.hash || ""}-${child.label}`}>
                            <Link
                              className={styles["site-header__mobile-subnav-link"]}
                              href={buildHref(child.path, child.hash)}
                              prefetch={false}
                              onClick={closeMenu}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <CtaLink
              button={global.primaryCta}
              className={`${styles["site-header__cta"]} ${styles["site-header__cta--primary"]}`}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
  const resolveChildren = (label: string, children?: SiteSubLink[]) => {
    if (children?.length) {
      return children;
    }

    return label.toLowerCase() === "treatments" ? treatmentFallbackChildren : [];
  };
