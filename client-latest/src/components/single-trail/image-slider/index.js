import React from "react";
import NextImage from "@/components/image";

const ImageSlider = ({ data, index }) => {
  console.log(data.url);
  const { url, width, height } = data;

  return (
    <>
      <div className="border rounded shadow">
        <NextImage url={url} width={width} height={height} />
      </div>
    </>
  );
};

export default ImageSlider;
