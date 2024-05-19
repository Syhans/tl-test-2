import Image from "next/image";

import { getImageProps } from "@/lib/api";

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
