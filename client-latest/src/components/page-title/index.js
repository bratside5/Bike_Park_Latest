import React from "react";

const PageTitle = ({ title }) => {
  return (
    <>
      <div className="w-full h-auto flex justify-center">
        <div className="text-center text-4xl mt-1 py-6">
          <h1 className="">{title}</h1>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
