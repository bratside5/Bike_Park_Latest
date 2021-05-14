import Image from "next/image";

const NextImage = ({ url, width, height }) => {
  return (
    <>
      <div className="py-6 px-3">
        <div className="w-full h-auto flex items-center justify-center rounded-lg shadow-lg border">
          <Image src={url} width={width} height={height} />
        </div>
      </div>
    </>
  );
};

export default NextImage;
