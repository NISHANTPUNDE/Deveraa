import Image from "next/image";

const ContentImage = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      className="w-full max-w-4xl h-full rounded-lg py-2 object-fill"
      width={200}
      height={200}
    />
  );
};

export default ContentImage;
