import { PostTable } from "@/components/post";
import { Search } from "@/components/search";
import { api } from "@/trpc/server";
import { FlameIcon, ImageIcon } from "lucide-react";
import { Suspense } from "react";
import CategoryThumbnails from "./category-thumbnails";
import RecentPhotos from "./recent-photos";

export const dynamic = "force-dynamic";

export default async function Page() {
  const recents = await api.post.getRecent(10);
  const categoryStats = await api.category.getStats();

  return (
    <main className="space-y-6 md:space-y-10">
      <Suspense>
        <Search />
      </Suspense>

      <section>
        <div className="basis-3/5 flex flex-col justify-center">
          <h1 className="mb-4">Welcome to EmoryLife!</h1>
          <p className="text-muted-foreground">
            Proident consectetur ea cupidatat nostrud.
            <br />
            Commodo aute ullamco nulla amet ad esse sunt duis Lorem deserunt.
          </p>
        </div>
      </section>

      <CategoryThumbnails stats={categoryStats} />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-3 h-min">
        <div className="md:basis-3/5 order-2 lg:order-1">
          <span className="block text-lg font-medium mb-1">
            <ImageIcon size={20} className="inline-block mr-2 text-cyan-600" />
            Recent Photos
          </span>
          <RecentPhotos />
        </div>
        <div className="md:basis-2/5 order-1 lg:order-2">
          <span className="block text-lg font-medium mb-2">
            <FlameIcon size={20} className="inline-block mr-2 text-cyan-600" />
            Hot
          </span>
          <div className="border p-3 rounded-md grow h-[506px] xl:h-[609px] 2xl:h-[711px] overflow-hidden">
            <div className="h-full mask-b-from-80% mask-b-to-100%">
              <PostTable data={recents} isLoading={false} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
