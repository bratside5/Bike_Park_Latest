import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/utils/api";
import PageTitle from "@/components/page-title";
import RenderMarkDown from "@/components/md-article";

const RulesPage = ({ data }) => {
  const [rulesData, setRulesData] = useState([data]);
  console.log(rulesData);

  if (rulesData.length > 0) {
    const {
      title,
      textes_securite,

      trail_signs: { url, width, height },
    } = rulesData[0];

    return (
      <>
        <PageTitle title={title} />
        <RenderMarkDown article={textes_securite} />
      </>
    );
  }
};

export const getServerSideProps = async ({ locale }) => {
  if (locale === "en") {
    const data = await fetchAPI(`/rules?_locale=en`);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        data,
        locale,
      },
    };
  } else {
    const data = await fetchAPI(`/rules`);
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

export default RulesPage;
