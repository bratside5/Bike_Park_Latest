import MainMap from "@/components/main-map";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

export default function Home({ locale }) {
  return (
    <>
      <NextSeo
        title="Carte Principal"
        description="Carte principale du domaine "
        canonical="https://bikeparktignes.com/"
      />
      <MainMap />
    </>
  );
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      data: null,
      locale,
    },
  };
};
