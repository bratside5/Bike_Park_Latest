import React from "react";
import Image from "next/image";

const ImageSlider = ({ data, index }) => {
  console.log(data.url);
  const { url, width, height } = data;

  return (
    <>
      <div className="flex items-center justify-center py-3 w-auto h-auto">
        <div className="object-contain w-3/4">
          <Image src={url} width={width} height={height} />
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
