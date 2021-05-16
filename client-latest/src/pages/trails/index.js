import { useState } from "react";
import DataTable from "@/components/data-table/DataTable";
import { fetchAPI, fetchLocalApi } from "@/utils/api";
import SelectDifficulty from "@/components/data-table/SelectDifficulty";
import PageTitle from "@/components/page-title";
import Cards from "@/components/cards";

const index = ({ geoJson, data }) => {
  const [allData, setallData] = useState([...geoJson.features, ...data]);
  console.log(allData);
  const title = "Trails";
  return (
    <>
      <PageTitle title={title} />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 px-4 py-3">
        {data &&
          data.map((data) => (
            <Cards key={data.id} data={data} geoJson={geoJson.features} />
          ))}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }) => {
  const data = await fetchAPI(`/descriptions-des-pistes`);
  const requestUrl = fetchLocalApi(`/trail-payload`);
  const response = await fetch(requestUrl);
  const geoJson = await response.json();

  if ((!data, !geoJson)) {
    console.log("Not Found");
  }
  return {
    props: {
      data,
      geoJson,
    },
  };
};

export default index;
