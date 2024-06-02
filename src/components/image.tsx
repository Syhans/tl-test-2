import { getImageProps } from "@/lib/api";
import ExportedImage from "next-image-export-optimizer";

async function NextImageWrapper({
  src,
  alt,
  showCaption,
  priority,
}: {
  src: string;
  alt?: string;
  showCaption?: boolean;
  priority?: boolean;
}) {
  const { width, height } = await getImageProps(src);
  const Img = (
    <ExportedImage
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      priority={priority}
    />
  );
  if (!showCaption) {
    return Img;
  }
  return (
    <>
      {Img}
      <span className="inline-flex w-full justify-center text-center text-sm italic">
        {alt}
      </span>
    </>
  );
}

export { NextImageWrapper };
