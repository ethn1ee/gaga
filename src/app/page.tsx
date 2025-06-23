import { PostTable } from "@/components/post";
import { Search } from "@/components/search";
import Title from "@/components/title";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getFileType, getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  const [recents, recentQuery] = api.post.getRecent.useSuspenseQuery(5);
  const [photos] = api.post.getPhotos.useSuspenseQuery();

  return (
    <main className="space-y-10">
      <Suspense>
        <Search />
      </Suspense>

      <section>
        <Title category="Recent Posts" />
        <PostTable data={recents} isLoading={recentQuery.isLoading} />
      </section>

      <section id="photos" className="">
        <Title category="Recent Photos" />
        <Carousel>
          <CarouselContent className="-ml-2">
            {photos.map((photoPost, i) => {
              const photos = photoPost.attachments.filter(
                (file) => getFileType(file) === "image",
              );
              return (
                photos[0] && (
                  <CarouselItem key={i} className="basis-1/3 md:basis-1/5 pl-2">
                    <Link href={`/post/${photoPost.id}`}>
                      <Card className="p-2 border-none shadow-none gap-3 hover:bg-accent">
                        <CardContent className="p-0">
                          <AspectRatio
                            ratio={9 / 16}
                            className="rounded-md overflow-hidden border"
                          >
                            <Image
                              src={photos[0]}
                              alt="photo"
                              fill
                              className="object-cover"
                            />
                          </AspectRatio>
                        </CardContent>
                        <CardHeader className="p-0">
                          <CardTitle className="h-8 font-medium overflow-hidden overflow-ellipsis break-word line-clamp-2">
                            {photoPost.title}
                          </CardTitle>
                          <CardDescription>
                            {getRelativeTime(photoPost.createdAt)}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </CarouselItem>
                )
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
}
