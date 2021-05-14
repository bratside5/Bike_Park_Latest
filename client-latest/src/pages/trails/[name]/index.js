import { useState } from "react";
import { fetchAPI, fetchLocalApi } from "@/utils/api";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import SingleStats from "@/components/single-trail/single-stats";
import PageTitle from "@/components/page-title";
import NextImage from "@/components/image";

const DynamicComponentWithCustomLoading = dynamic(
  () => import("@/components/single-trail/single-map"),
  { ssr: false }
);

const index = ({ data, params, geoJsonProperties, geoJsonFullData }) => {
  const slug = data[0].title;
  console.log(slug, data, geoJsonFullData, geoJsonProperties);

  const [geoJsonCoords, setGeoJsonCoords] = useState(
    geoJsonFullData.features.filter((data) => data.properties.Nom === slug)
  );

  if (data.length > 0) {
    const {
      title,
      description,
      access,
      image_principale: { url, width, height },
    } = data[0];

    return (
      <>
        {geoJsonCoords && geoJsonCoords !== [] ? (
          <>
            <DynamicComponentWithCustomLoading geoJsonCoords={geoJsonCoords} />
            <PageTitle title={title} />
            <SingleStats />
            <div className="flex-col items-center justify-center w-full h-auto px-6">
              <h2 className="text-center py-3 text-2xl">Description</h2>
              <p className="text-center">{description}</p>
            </div>
            <div className="flex-col items-center justify-center w-full h-auto px-6">
              <h2 className="text-center py-3 text-2xl">Access</h2>
              <p className="text-center">{access}</p>
            </div>
            <NextImage url={url} width={width} height={height} />
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </>
    );
  }

  return (
    <div className="flex h-screen w-auto justify-center items-center">
      Not Found...
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const data = await fetchAPI(`/descriptions-des-pistes/?slug=${params.name}`);
  const requestUrl = await fetchLocalApi(`/trail-payload/${params.name}`);
  const requestUrlFullPayload = await fetchLocalApi(`/trail-payload`);
  const response = await fetch(requestUrl);
  const responseFull = await fetch(requestUrlFullPayload);
  const geoJsonProperties = await response.json();
  const geoJsonFullData = await responseFull.json();
  if ((!data, !geoJsonProperties)) {
    console.log("Not Found");
  }
  return {
    props: {
      data,
      geoJsonProperties,
      geoJsonFullData,
      params,
    },
  };
};

export default index;
