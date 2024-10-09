"use client";
import { useEffect, useState } from "react";

const IframeTag = ({ videourl }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(true);
  }, []);

  return (
    <div>
      {iframeLoaded && videourl && (
        <iframe
          src={videourl}
          className="w-full h-96"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};
export default IframeTag;
