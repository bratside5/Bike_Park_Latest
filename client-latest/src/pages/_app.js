import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Layout from "@/components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
