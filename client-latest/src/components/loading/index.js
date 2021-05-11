import React from "react";
import Loader from "react-loader-spinner";

const index = () => {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="">
          <Loader color="#00BFFF" height={100} width={100} />
          <div className="text-center text-muted font-light py-3">
            Loading...
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
