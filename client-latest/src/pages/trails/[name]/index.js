import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { fetchAPI, fetchLocalApi } from "@/utils/api";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Loading from "@/components/loading";
import SingleStats from "@/components/single-trail/single-stats";
import PageTitle from "@/components/page-title";
import NextImage from "@/components/image";
import ImageSlider from "@/components/single-trail/image-slider";
import YouTubePlayer from "@/components/single-trail/youtube";
import { NextSeo } from "next-seo";

const DynamicComponentWithCustomLoading = dynamic(
  () => import("@/components/single-trail/single-map"),
  { ssr: false }
);

const index = ({ data, params, geoJsonProperties, geoJsonFullData }) => {
  const [trailLength, setTrailLength] = useState("");
  const { t } = useTranslation("common");
  const router = useRouter();

  if (data[0] !== undefined) {
    const {
      title,
      description_en,
      access_en,
      description_fr,
      access_fr,
      image_principale: { url, width, height },
      galerie_images,
      lien_youtube,
    } = data[0];
    const slug = data[0].title;

    const [geoJsonCoords, setGeoJsonCoords] = useState(
      geoJsonFullData.features.filter((data) => data.properties.Nom === slug)
    );

    const getDescription =
      router.locale !== "en" ? description_fr : description_en;
    const getAccess = router.locale !== "en" ? access_fr : access_en;

    return (
      <>
        <NextSeo
          title={title}
          description={description_fr}
          canonical={`https://www.bikeparktignes.com/trails/${slug}`}
        />
        {geoJsonCoords && geoJsonCoords !== [] ? (
          <>
            <DynamicComponentWithCustomLoading
              geoJsonCoords={geoJsonCoords}
              title={title}
              setTrailLength={setTrailLength}
            />
            <PageTitle title={title} />
            <SingleStats
              trailLength={trailLength}
              geoJsonCoords={geoJsonCoords}
            />
            <div className="flex-col items-center justify-center w-full h-auto px-6">
              <h2 className="text-center py-3 text-3xl mb-2">Description</h2>
              <p className="text-center mb-3">{getDescription}</p>
            </div>
            <NextImage url={url} width={width} height={height} />
            <div className="flex-col items-center justify-center w-full h-auto px-6">
              <h2 className="text-center py-3 text-3xl mb-2">Access</h2>
              <p className="text-center mb-3">{getAccess}</p>
            </div>
            {galerie_images &&
              galerie_images.map((data, index) => (
                <ImageSlider key={data.id} data={data} index={index} />
              ))}
            <div className="my-12 mx-auto w-full h-full">
              <YouTubePlayer lien_youtube={lien_youtube} />
            </div>
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
    <div className="flex h-screen w-auto justify-center items-center text-center">
      Not Found... <br /> This Trail Doesnt Exist In Strapi Yet... <br /> Please
      Add It
    </div>
  );
};

export const getServerSideProps = async ({ params, locale }) => {
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
      ...(await serverSideTranslations(locale, ["common"])),
      data,
      geoJsonProperties,
      geoJsonFullData,
      params,
    },
  };
};

export default index;
