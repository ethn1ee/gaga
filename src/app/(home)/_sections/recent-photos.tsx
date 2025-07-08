import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getFileType } from "@/lib/utils";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";

const RecentPhotos = async () => {
  const photos = await api.post.getPhotos(9);

  return (
    <section id="recent-photos" className="md:basis-3/5 order-2 lg:order-1">
      <span className="block text-lg font-medium mb-2">Recent Photos</span>
      <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md">
        {photos.map((photoPost, i) => {
          const photos = photoPost.attachments.filter(
            (file) => getFileType(file) === "image",
          );
          return (
            photos[0] && (
              <Link key={i} href={`/post/${photoPost.id}`}>
                <AspectRatio ratio={1} className="overflow-hidden">
                  <Image
                    src={photos[0]}
                    alt="photo"
                    fill
                    sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 300px"
                    className="object-cover hover:scale-105 animate"
                  />
                </AspectRatio>
              </Link>
            )
          );
        })}
      </div>
    </section>
  );
};

export default RecentPhotos;
