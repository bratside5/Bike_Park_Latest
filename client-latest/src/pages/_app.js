import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Layout from "@/components/layout";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
