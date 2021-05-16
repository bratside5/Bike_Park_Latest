import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCurrentLocation from "@/components/hooks/useCurrentLocation";
import useWatchLocation from "@/components/hooks/useWatchLocation";
import { geolocationOptions } from "@/utils/geolocationOptions";
import Location from "./Location";
import { FaCircle } from "react-icons/fa";

function index() {
  const router = useRouter();
  const { location: currentLocation, error: currentError } =
    useCurrentLocation(geolocationOptions);
  const { location, cancelLocationWatch, error } =
    useWatchLocation(geolocationOptions);
  const [isWatchinForLocation, setIsWatchForLocation] = useState(true);

  const turnOff = () => {
    setIsWatchForLocation(!true);
    cancelLocationWatch();
  };

  const turnOn = () => {
    setIsWatchForLocation(!false);
    cancelLocationWatch();
  };

  useEffect(() => {
    if (!location) return;
  }, [location, cancelLocationWatch, turnOff]);

  return (
    <>
      <div className="flex-row items-center justify-center w-full h-auto px-6 py-6 text-center">
        <Location location={location} error={error} />

        <div className="flex-row items-center justify-center w-full h-auto px-6 text-center">
          {isWatchinForLocation ? (
            <div className="mb-12">
              <div className="inline-flex justify-center items-center w-full h-auto py-3">
                <div className="text-green-500 text-2xl">
                  <FaCircle />
                </div>
              </div>
              <div className="">
                <button className="py-3 px-6 rounded border" onClick={turnOff}>
                  Cancel Tracking
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-12">
              <div className=" inline-flex justify-center items-center w-full h-auto py-3">
                <div className="text-red-500 text-2xl">
                  <FaCircle />
                </div>
              </div>
              <div className="">
                <button
                  className="py-3 px-6 rounded border"
                  onClick={() => router.reload()}
                >
                  Start Tracking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default index;
