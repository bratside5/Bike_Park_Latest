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

  useEffect(async () => {
    const requestUrl = fetchLocalApi("trail-payload");
    const response = await fetch(requestUrl);
    const data = await response.json();
    setTrailData(data);
    setSelectData(data.features);
  }, []);

  return (
    <>
      {trailData && trailData !== [] ? (
        <DynamicComponentWithCustomLoading trailData={trailData} />
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default MainMap;
