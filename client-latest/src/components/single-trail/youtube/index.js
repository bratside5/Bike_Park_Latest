import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ lien_youtube }) => {
  const opts = {
    // height: "100%",
    // width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <div className="flex justify-center items-center shadow p-12 max-w-screen-md w-1/2">
        <YouTube videoId={lien_youtube} opts={opts} />
      </div>
    </>
  );
};

export default YouTubePlayer;
