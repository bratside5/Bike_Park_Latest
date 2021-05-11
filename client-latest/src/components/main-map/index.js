import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import { fetchLocalApi } from "@/utils/api";

const DynamicComponentWithCustomLoading = dynamic(
  () => import("@/components/main-map/Map"),
  // { loading: () => <p>Loading....</p> },
  { ssr: false }
);

function MainMap() {
  const [trailData, setTrailData] = useState(null);
  const [selectData, setSelectData] = useState([]);
  // const [selectedDifficulty, setSelectedDifficulty] = useState([]);

  useEffect(async () => {
    const requestUrl = fetchLocalApi("trail-payload");
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    const data = await response.json();
    setTrailData(data);
    setSelectData(data.features);

    if (selectData !== []) {
      const mapData = selectData.map((data) => {
        const { Nom } = data.properties;
        return Nom;
      });
    }
  }, []);

  return (
    <>
      {trailData && trailData !== [] ? (
        <div className="">
          <DynamicComponentWithCustomLoading trailData={trailData} />
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default MainMap;
