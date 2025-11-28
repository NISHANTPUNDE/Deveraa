"use client";
import React from "react";

const RightAside = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {
  return (
    <aside>
      <div className="bg-gray-100 p-4 md:col-span-1  sm:max-h-[20vh] md:max-h-full mb-4">
        <div className="flex items-center mt-4 space-x-3">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4558399330681578"
            data-ad-slot={1768660701}
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
            data-ad-slot={6113301642}
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
            data-ad-slot={1603210996}
            data-ad-format={dataAdFormat}
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </aside>

  );
};

export default RightAside;
