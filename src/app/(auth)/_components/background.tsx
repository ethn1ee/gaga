import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, type ComponentProps } from "react";

const Background = () => {
  return (
    <div className="flex-1 grid grid-cols-3 gap-2 size-full rounded-2xl overflow-hidden">
      <ScrollingGallery start={0} end={10} velocity={4} />
      <ScrollingGallery start={10} end={20} velocity={3} />
      <ScrollingGallery start={20} end={30} velocity={2} />
    </div>
  );
};

export default Background;

const ScrollingGallery = ({
  start,
  end,
  className,
  velocity,
}: ComponentProps<"div"> & {
  start: number;
  end: number;
  velocity: number;
}) => {
  return (
    <div
      data-velocity={velocity}
      className={cn("flex flex-col gap-2 group", className)}
    >
      <div className="flex flex-col gap-2 group-data-[velocity=1]:animate-scroll-1 group-data-[velocity=2]:animate-scroll-2 group-data-[velocity=3]:animate-scroll-3 group-data-[velocity=4]:animate-scroll-4">
        {[...Array<0>(end - start)].map((_, i) => (
          <ImageCell key={i} src={`/images/${i + start}.webp`} />
        ))}
      </div>
      <div className="flex flex-col gap-2 not-sr-only group-data-[velocity=1]:animate-scroll-1 group-data-[velocity=2]:animate-scroll-2 group-data-[velocity=3]:animate-scroll-3 group-data-[velocity=4]:animate-scroll-4">
        {[...Array<0>(end - start)].map((_, i) => (
          <ImageCell key={i} src={`/images/${i + start}.webp`} />
        ))}
      </div>
    </div>
  );
};

type ImageCellProps = {
  src: string;
};

const ImageCell = memo(({ src }: ImageCellProps) => {
  return (
    <AspectRatio ratio={1 / 1} className="relative">
      <Image
        src={src}
        alt="Image"
        quality={30}
        fill
        sizes="200px"
        className="object-cover bg-muted"
      />
    </AspectRatio>
  );
});
ImageCell.displayName = "ImageCell";
