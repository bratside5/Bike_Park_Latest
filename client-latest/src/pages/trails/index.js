// import TabsRender from "@/components/tabs";
// import TrailsList from "@/components/trails-list";
import { fetchAPI } from "@/utils/api";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslation } from "next-i18next";

const index = ({ data, categoryData }) => {
  return (
    <div>
      {/* <TabsRender /> */}
      {/* <TrailsList data={data} categoryData={categoryData} /> */}
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => {
  const data = await fetchAPI("/trails");
  const categoryData = await fetchAPI("/categories");
  if ((!data, !categoryData)) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
      categoryData,
      // ...(await serverSideTranslations(locale, ["common", "trail-info"])),
    },
  };
};

export default index;
