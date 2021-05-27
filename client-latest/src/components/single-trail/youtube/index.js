import React from "react";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import YouTube from "react-youtube";

const YouTubePlayer = ({ lien_youtube }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isBreakpoint = useMediaQuery(768);

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const optsXS = {
    height: 240,
    width: 240,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      {mounted && isBreakpoint ? (
        <div className="flex items-center justify-center py-3">
          <div className="object-contain">
            <YouTube videoId={lien_youtube} opts={optsXS} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-3 w-auto h-auto">
          <div className="md:w-auto md:h-auto md:mx-auto ">
            <YouTube videoId={lien_youtube} opts={opts} />
          </div>
        </div>
      )}
    </>
  );
};

export default YouTubePlayer;
