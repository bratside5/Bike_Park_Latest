import { useRouter } from "next/router";
import { useEffect } from "react";

import { fetchAPI } from "@/utils/api";
// import useSWR from "swr";

const index = ({ data, params }) => {
  const router = useRouter();
  console.log(data);
  const {
    title,
    description_en,
    description_fr,
    access_en,
    access_fr,
    image: { url },
  } = data[0];

  return (
    <>
      <section style={{ height: "60vh", position: "relative" }} className="">
        {title}
        <div className="">{description_en}</div>
        <img src={url} alt="" />
      </section>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const data = await fetchAPI(`/trails?slug=${params.name}`);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
      params,
    },
  };
};

export default index;
