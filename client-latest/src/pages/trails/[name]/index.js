import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAPI, fetchLocalApi } from "@/utils/api";
import Image from "next/image";

const index = ({ data, params, geoJson }) => {
  const [geoJsonData, setGeoJsonData] = useState([]);

  if (data.length > 0) {
    const {
      title,
      description,
      access,
      image_principale: { url, width, height },
    } = data[0];

    const { Type, Difficulté, Colour, Dénivelé, Distance, Secteur } =
      geoJson[0];

    console.log(Type);
    return (
      <>
        <section style={{ height: "60vh", position: "relative" }} className="">
          {title && title ? title : "Title Missing"}
          <div className="">{description}</div>
          <br />
          <div className="">{access}</div>
          <Image src={url} width={width} height={height} alt="" />
        </section>
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
  const requestUrl = fetchLocalApi(`trail-payload/${params.name}`);
  const response = await fetch(requestUrl);
  const geoJson = await response.json();

  if ((!data, !geoJson)) {
    console.log("Not Found");
  }
  return {
    props: {
      data,
      geoJson,
      params,
    },
  };
};

export default index;
