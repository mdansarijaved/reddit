import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
export const PopularSkeleton = () => {
  return (
    <div className="w-full px-10 pt-10">
      <Carousel>
        <CarouselContent>
          {[...Array(4)].map((_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="relative">
                <Skeleton className="w-full h-[300px] rounded-xl" />
                <div className="w-full h-[300px] bg-transparent absolute top-0 left-0 rounded-xl hover:bg-transparent/35 transition-all duration-300">
                  <div className="w-full h-full flex flex-col justify-end items-start p-2 text-white">
                    <Skeleton className="w-full h-6 mb-2" />
                    <Skeleton className="w-3/4 h-4" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
