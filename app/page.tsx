import fallbackHome from "../content/landing/home.json";
import fallbackGlobal from "../content/site/global.json";
import type { HomePage, SiteGlobal } from "../types/site";
import tinaClient from "../tina/__generated__/client";
import HomeClientPage from "./home/client-page";
import StaticHomePage from "./home/static-page";

interface TinaPayload {
  query: string;
  variables: {
    relativePath: string;
  };
  data: Record<string, unknown>;
}

export default async function Page() {
  const client = tinaClient as any;

  const homeQueryName = client.queries?.landingPage ? "landingPage" : "landing_page";
  const globalQueryName = client.queries?.siteGlobal ? "siteGlobal" : "site_global";

  try {
    const [homePayload, globalPayload] = (await Promise.all([
      client.queries[homeQueryName]({
        relativePath: "home.json",
      }),
      client.queries[globalQueryName]({
        relativePath: "global.json",
      }),
    ])) as TinaPayload[];

    return <HomeClientPage homePayload={homePayload} globalPayload={globalPayload} />;
  } catch {
    return <StaticHomePage home={fallbackHome as HomePage} global={fallbackGlobal as SiteGlobal} />;
  }
}
