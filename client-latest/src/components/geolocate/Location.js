import React from "react";
import PropTypes from "prop-types";
import Loading from "@/components/loading";

const Location = ({ location, error }) => {
  return (
    <div>
      {location ? (
        <div className="flex-col h-auto w-full text-2xl">
          <div className="">
            <p className="py-1"> Latitude:</p>
          </div>
          <div className="">
            <p className="">{location.latitude}</p>
          </div>
          <div className="pt-3">
            <p className="py-1"> Longitude:</p>
          </div>
          <div className="">
            <p className="">{location.longitude}</p>
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
      {error && <p className="errorMessage">Location Error: {error}</p>}
    </div>
  );
};

Location.propTypes = {
  location: PropTypes.object,
  error: PropTypes.string,
};

export default Location;
