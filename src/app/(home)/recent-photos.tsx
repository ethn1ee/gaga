import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFileType, getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";

const RecentPhotos = async () => {
  const photos = await api.post.getPhotos(6);

  return (
    <section
      id="photos"
      className="grid grid-cols-2 lg:grid-cols-3 gap-1"
    >
      {photos.map((photoPost, i) => {
        const photos = photoPost.attachments.filter(
          (file) => getFileType(file) === "image",
        );
        return (
          photos[0] && (
            <Link key={i} href={`/post/${photoPost.id}`}>
              <Card className="px-1 py-1.5 border-none shadow-none gap-3 hover:bg-accent">
                <CardContent className="p-0">
                  <AspectRatio
                    ratio={1}
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
                  <CardTitle className="font-normal truncate">
                    {photoPost.title}
                  </CardTitle>
                  <CardDescription>
                    {getRelativeTime(photoPost.createdAt)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        );
      })}
    </section>
  );
};

export default RecentPhotos;
