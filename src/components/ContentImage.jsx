"use client";

import Image from "next/image";

const ContentImage = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      className="w-full max-w-4xl h-auto rounded-lg py-2"
      width={400}
      height={400}
    />
  );
};

export default ContentImage;
