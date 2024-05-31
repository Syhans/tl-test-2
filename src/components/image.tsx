import { getImageProps } from "@/lib/api";
import ExportedImage from "next-image-export-optimizer";

async function NextImageWrapper({
  src,
  alt,
  priority,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
}) {
  const { width, height } = await getImageProps(src);
  return (
    <ExportedImage
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      priority={priority}
    />
  );
}

export { NextImageWrapper };
