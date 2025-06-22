import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  type CarouselApi,
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, extractOriginalFilename, getFileType } from "@/lib/utils";
import { type Post } from "@prisma/client";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type CarouselProps = {
  attachments: Post["attachments"];
};

const Carousel = ({ attachments }: CarouselProps) => {
  const images = attachments.filter((file) => getFileType(file) === "image");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.scrollTo(0);
    setCount(images.length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, attachments, images.length]);

  const handleClick = () => {
    if (!api) return;
    if (current === count - 1) api.scrollTo(0);
    else api.scrollNext();
  };

  return (
    <CarouselComponent
      setApi={setApi}
      className={cn(images.length > 0 ? "block" : "hidden")}
    >
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem
            key={i}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <AspectRatio
              ratio={1 / 1}
              className="relative overflow-hidden rounded-md w-full"
            >
              <Image
                src={img}
                alt={extractOriginalFilename(img)}
                fill
                quality={50}
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-between mt-2">
        <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 top-0" />
        <div
          onClick={handleClick}
          className="py-2 flex gap-1 items-center cursor-pointer"
        >
          {[...Array<0>(images.length)].map((_, i) => (
            <motion.div
              key={i}
              animate={
                i === current
                  ? {
                      width: 12,
                      opacity: 0.8,
                    }
                  : { width: 8, opacity: 0.2 }
              }
              className="h-2 rounded-full border bg-muted-foreground w-2"
            />
          ))}
        </div>
        <CarouselNext className="relative translate-x-0 translate-y-0 left-0 top-0" />
      </div>
    </CarouselComponent>
  );
};

export default Carousel;
