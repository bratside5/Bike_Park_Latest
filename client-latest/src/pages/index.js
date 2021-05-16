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
  if (locale === "en") {
    // const data = await fetchAPI(`/contact-d-urgence?_locale=en`);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // data,
        locale,
      },
    };
  }
};
