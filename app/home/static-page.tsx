import SectionRenderer from "../../components/sections/SectionRenderer";
import Footer from "../../components/site/Footer";
import Header from "../../components/site/Header";
import type { HomePage, SiteGlobal } from "../../types/site";

interface StaticHomePageProps {
  home: HomePage;
  global: SiteGlobal;
}

export default function StaticHomePage({ home, global }: StaticHomePageProps) {
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
        <Header global={global} />
        <main id="main-content" tabIndex={-1} className="mainContent">
          <SectionRenderer sections={home.sections || []} />
        </main>
        <Footer global={global} />
      </div>
    </>
  );
}
