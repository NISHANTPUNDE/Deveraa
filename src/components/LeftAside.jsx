"use client";
import React, { useEffect } from "react";
const LeftAside = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.adsbygoogle && window.adsbygoogle.loaded === false) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error("AdSense error:", error);
        }
      }
    }
  }, []);
  return (
    <aside>
      <div className="bg-gray-200 p-4 md:col-span-1 shadow-md sm:max-h-[20vh] md:max-h-full mb-4">
        <div className="flex items-center mt-4 space-x-3">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5901668124190040"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </aside>
  );
};

export default LeftAside;
