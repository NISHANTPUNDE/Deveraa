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
      <div className="bg-gray-100 p-4 md:col-span-1  sm:max-h-[20vh] md:max-h-full mb-4">
        <div className="flex items-center mt-4 space-x-3">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4558399330681578"
            data-ad-slot={8361989217}
            data-ad-format={dataAdFormat}
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
      <div className="bg-gray-100 hidden md:block p-4 md:col-span-1  sm:max-h-[20vh] md:max-h-full mb-4">
        <div className="flex items-center mt-4 space-x-3">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4558399330681578"
            data-ad-slot={3959709774}
            data-ad-format={dataAdFormat}
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
      <div className="bg-gray-100 hidden md:block p-4 md:col-span-1  sm:max-h-[20vh] md:max-h-full mb-4">
        <div className="flex items-center mt-4 space-x-3">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4558399330681578"
            data-ad-slot={8168619345}
            data-ad-format={dataAdFormat}
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </aside>
  );
};

export default LeftAside;
