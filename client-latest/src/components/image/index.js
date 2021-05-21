import Image from "next/image";

const NextImage = ({ url, width, height }) => {
  return (
    <>
      <div className="flex items-center justify-center py-3">
        <div className="object-contain">
          <Image src={url} width={width} height={height} />
        </div>
      </div>
    </>
  );
};

export default NextImage;
