import { NextImageWrapper as Image } from "@/components/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImageCarousel({
  srcs,
  alts,
  showCaptions = true,
}: {
  srcs: string[];
  alts?: string[];
  showCaptions?: boolean;
}) {
  if (alts) {
    if (srcs.length !== alts.length) {
      throw new Error(
        "ImageCarousel: when using alts, srcs and alts must have the same number of items.",
      );
    }
  }

  return (
    <Carousel className="relative w-full">
      <CarouselContent>
        {srcs.map((src, i) => (
          <CarouselItem key={i}>
            <Image
              src={src}
              alt={
                alts ? alts[i] : `Image carousel image ${(i + 1).toString()}`
              }
              showCaption={showCaptions}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4" />
      <CarouselNext className="absolute right-4" />
    </Carousel>
  );
}
