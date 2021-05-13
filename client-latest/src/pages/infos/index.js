import { useState } from "react";
import RenderMarkDown from "@/components/md-article";
import { fetchAPI } from "@/utils/api";
import PageTitle from "@/components/page-title";
import TimeTable from "@/components/timetable";

const index = ({ data }) => {
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
        <PageTitle title={title} />
        <RenderMarkDown article={dernieres_informations} />
        <RenderMarkDown article={infos_navette} />
        <TimeTable heures={heures_navette} />
        <RenderMarkDown article={infos_telesiege} />
        <TimeTable heures={heures_telesiege} />
        <RenderMarkDown article={texte_secondaire} />
      </>
    );
  }
  return (
    <div className="flex h-screen w-auto justify-center items-center">
      Not Found...
    </div>
  );
};
export const getServerSideProps = async () => {
  const data = await fetchAPI(`/informations`);

  if (!data) {
    console.log("empty Data");
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default index;
