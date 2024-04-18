import Image from "next/image";

import { getImageProps } from "@/lib/api";

async function NextImageWrapper({ src, alt }: { src: string; alt?: string }) {
  const { width, height, blurDataURL } = await getImageProps(src);
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}

export { NextImageWrapper };
