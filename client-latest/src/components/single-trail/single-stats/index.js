import React from "react";

const SingleStats = ({ trailLength, geoJsonCoords }) => {
  console.log(geoJsonCoords[0].properties);
  const {
    Difficulté: difficulty,
    Dénivelé: denivele,
    Secteur: sector,
    Type,
  } = geoJsonCoords[0].properties;
  return (
    <>
      <div className="flex items-center justify-center h-auto w-full p-3">
        <div className="border border-gray-200 rounded-md shadow-md py-3">
          <div className="text-center">
            <h3 className="text-2xl">Stats</h3>
          </div>
          <div className="text-center">
            <div className="py-3 px-3">
              <div className="flex content-between justify-between items-center w-full h-auto">
                <p className="px-3">Type: {Type}</p>
                <p className="px-3">Length: {trailLength}</p>
                <p className="px-3">Difficulty: {difficulty}</p>
                <p className="px-3">Sector: {sector}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStats;
