import MainMap from "@/components/main-map";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home({ locale }) {
  return (
    <>
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
