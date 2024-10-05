import Script from "next/script";
import React from "react";

const AdSense = ({ pId }) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5901668124190040`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};

export default AdSense;
