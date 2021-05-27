import { useState } from "react";
import RenderMarkDown from "@/components/md-article";
import { fetchAPI } from "@/utils/api";
import PageTitle from "@/components/page-title";
import TimeTable from "@/components/timetable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const index = ({ data, locale }) => {
  const [infoData, setInfoData] = useState([data]);

  if (infoData.length > 0) {
    const {
      title,
      dernieres_informations,
      texte_secondaire,
      heures_navette,
      infos_navette,
      infos_telesiege,
      heures_telesiege,
    } = infoData[0];
    return (
      <>
        <div className="">
          <PageTitle title={title} />
          <RenderMarkDown article={dernieres_informations} />
          <div className="border border-gray-200 rounded shadow-lg mx-3 py-3 my-3">
            <RenderMarkDown article={infos_navette} />
            <TimeTable heures={heures_navette} />
          </div>
          <div className="border border-gray-200 rounded shadow-lg mx-3 py-3 my-3">
            <RenderMarkDown article={infos_telesiege} />
            <TimeTable heures={heures_telesiege} />
          </div>
          <RenderMarkDown article={texte_secondaire} />
        </div>
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
    const data = await fetchAPI(`/informations?_locale=en`);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        data,
        locale,
      },
    };
  } else {
    const data = await fetchAPI(`/informations`);
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
