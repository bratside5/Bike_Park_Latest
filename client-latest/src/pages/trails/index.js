import { useState } from "react";
import DataTable from "@/components/data-table/DataTable";
import { fetchAPI, fetchLocalApi } from "@/utils/api";
import SelectDifficulty from "@/components/data-table/SelectDifficulty";
import PageTitle from "@/components/page-title";

const index = ({ geoJson }) => {
  const [query, setQuery] = useState("");
  const title = "Trails";
  return (
    <>
      <PageTitle title={title} />
      <div className="mb-6">
        <div className="flex items-center justify-center px-3">
          {/* <SelectDifficulty query={query} setQuery={setQuery} /> */}
        </div>
        <div className="flex items-center justify-center">
          <DataTable geoJson={geoJson} />{" "}
        </div>
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
