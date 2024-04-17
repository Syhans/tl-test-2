import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    // <Image
    //   src={src}
    //   alt={`Cover Image for ${title}`}
    //   className={cn(
    //     "shadow-sm w-full",
    //     slug && "hover:shadow-lg transition-shadow duration-200"
    //   )}
    //   width={1280}
    //   height={720}
    // />
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(
        "shadow-sm w-full",
        slug && "hover:shadow-lg transition-shadow duration-200"
      )}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export { CoverImage };
