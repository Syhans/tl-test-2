import { getImageProps } from "@/lib/api";
import Image from "next/image";

async function NextImageWrapper({
  src,
  alt,
  priority,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
}) {
  const { width, height, blurDataURL } = await getImageProps(src);
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      priority={priority}
    />
  );
}

export { NextImageWrapper };
