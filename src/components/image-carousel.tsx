import { NextImageWrapper as Image } from "@/components/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImageCarousel() {
  return (
    <Carousel className="relative w-full">
      <CarouselContent>
        <CarouselItem>
          <Image src="/assets/images/E01_0425.jpg" alt="1" />
        </CarouselItem>
        <CarouselItem>
          <Image src="/assets/images/E01_0425.jpg" alt="1" />
        </CarouselItem>
        <CarouselItem>
          <Image src="/assets/images/E01_0425.jpg" alt="1" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute left-4" />
      <CarouselNext className="absolute right-4" />
    </Carousel>
  );
}
