import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
function ImageCarousel({ media }: { media: string[] }) {
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {media.map((media, index) => (
          <CarouselItem key={index}>
            <div className="w-full bg-gray-300 rounded-xl">
              <Image
                alt="hey"
                key={index}
                height={600}
                width={600}
                className="w-full  h-[28rem] object-contain "
                src={media}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ImageCarousel;
