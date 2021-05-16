import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = () => {
  const opts = {
    height: "480px",
    width: "auto",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <>
      <div className="flex justify-center items-center shadow">
        <YouTube videoId="2g811Eo7K8U" opts={opts} />
      </div>
    </>
  );
};

export default YouTubePlayer;
