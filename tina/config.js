import { defineConfig } from "tinacms";
import page from "./collections/page";
import post from "./collections/post";
import siteGlobal from "./collections/site-global";
import landingPage from "./collections/landing-page";

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema: {
    collections: [siteGlobal, landingPage, page, post],
  },
});

export default config;
