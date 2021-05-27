import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Layout from "@/components/layout";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
