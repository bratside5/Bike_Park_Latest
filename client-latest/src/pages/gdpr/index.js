import { useState } from "react";
import RenderMarkDown from "@/components/md-article";
import { fetchAPI } from "@/utils/api";
import PageTitle from "@/components/page-title";

const index = ({ data }) => {
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
export const getServerSideProps = async () => {
  const data = await fetchAPI(`/rgpd`);
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
