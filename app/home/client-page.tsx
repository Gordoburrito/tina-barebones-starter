"use client";

import { useEffect } from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import SectionRenderer from "../../components/sections/SectionRenderer";
import Footer from "../../components/site/Footer";
import Header from "../../components/site/Header";
import type { HomePage, SiteGlobal } from "../../types/site";

interface TinaPayload {
  query: string;
  variables: {
    relativePath: string;
  };
  data: Record<string, unknown>;
}

interface HomeClientPageProps {
  homePayload: TinaPayload;
  globalPayload: TinaPayload;
}

function readHome(data: Record<string, unknown>) {
  return (data.landingPage || data.landing_page) as HomePage;
}

function readGlobal(data: Record<string, unknown>) {
  return (data.siteGlobal || data.site_global) as SiteGlobal;
}

export default function HomeClientPage({ homePayload, globalPayload }: HomeClientPageProps) {
  const { data: homeQueryData } = useTina({
    query: homePayload.query,
    variables: homePayload.variables,
    data: homePayload.data,
  });

  const { data: globalQueryData } = useTina({
    query: globalPayload.query,
    variables: globalPayload.variables,
    data: globalPayload.data,
  });

  const home = readHome(homeQueryData as Record<string, unknown>);
  const global = readGlobal(globalQueryData as Record<string, unknown>);
  const sectionCount = home?.sections?.length ?? 0;

  useEffect(() => {
    if (!home || !global) {
      return;
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!nodes.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const node = entry.target as HTMLElement;
          const delay = node.dataset.revealDelay;

          if (delay) {
            node.style.setProperty("--reveal-delay", `${delay}ms`);
          }

          node.classList.add("is-revealed");
          observer.unobserve(node);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, [global, home, sectionCount]);

  if (!home || !global) {
    return null;
  }

  const themeVars = {
    "--color-primary": global.theme.colors.primary,
    "--color-accent": global.theme.colors.accent,
    "--color-text": global.theme.colors.text,
    "--color-bg1": global.theme.colors.bg1,
    "--color-bg2": global.theme.colors.bg2,
    "--color-secondary": global.theme.colors.secondary,
    "--font-body-fallback": global.theme.fonts.body,
    "--font-heading-fallback": global.theme.fonts.heading,
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        <span className="skip-link__button">Skip to main content</span>
      </a>
      <div className="homepageRoot" style={themeVars as any}>
        <div data-tina-field={tinaField(global as any)}>
          <Header global={global} />
        </div>
        <main
          id="main-content"
          tabIndex={-1}
          className="mainContent"
          data-tina-field={tinaField(home as any, "sections")}
        >
          <SectionRenderer sections={home.sections || []} />
        </main>
        <div data-tina-field={tinaField(global as any)}>
          <Footer global={global} />
        </div>
      </div>
    </>
  );
}
