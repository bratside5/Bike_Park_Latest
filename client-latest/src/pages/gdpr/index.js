import { useState } from "react";
import RenderMarkDown from "@/components/md-article";
import { fetchAPI } from "@/utils/api";
import PageTitle from "@/components/page-title";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const index = ({ data, locale }) => {
  const [rgpdData, setRgpdData] = useState([data]);

  if (rgpdData.length > 0) {
    const { title, rgpd } = rgpdData[0];
    return (
      <>
        <PageTitle title={title} />
        <RenderMarkDown article={rgpd} />
      </>
    );
  }
  return (
    <div className="flex h-screen w-auto justify-center items-center">
      Not Found...
    </div>
  );
};
export const getServerSideProps = async ({ locale }) => {
  if (locale === "en") {
    const data = await fetchAPI(`/rgpd?_locale=en`);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        data,
        locale,
      },
    };
  } else {
    const data = await fetchAPI(`/rgpd`);
    console.log(locale);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        data,
        locale,
      },
    };
  }
};

export default index;
