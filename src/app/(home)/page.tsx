import { Search } from "@/components/search";
import { api } from "@/trpc/server";
import { Suspense } from "react";
import CategoryThumbnails from "./_sections/category-thumbnails";
import HotPosts from "./_sections/hot-posts";
import RecentPhotos from "./_sections/recent-photos";

export const dynamic = "force-dynamic";

export default async function Page() {
  const categoryStats = await api.category.getStats();

  return (
    <main className="space-y-6 md:space-y-10 pt-4">
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
        <RecentPhotos />
        <HotPosts />
      </div>
    </main>
  );
}
