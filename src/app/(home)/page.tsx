import { Search } from "@/components/search";
import { api } from "@/trpc/server";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import CategoryThumbnails from "./_sections/category-thumbnails";
import RecentPhotos from "./_sections/recent-photos";
import RecentPosts from "./_sections/recent-posts";

export default async function Page() {
  const t = await getTranslations("home");

  const categoryStats = await api.category.getStats();

  return (
    <main className="space-y-6 md:space-y-10 pt-4">
      <Suspense>
        <Search />
      </Suspense>

      <section>
        <h1 className="mb-4">{t("hero.title")}</h1>
        <p className="text-muted-foreground">
          {t("hero.subtitle.1")}
          <br />
          {t("hero.subtitle.2")}
        </p>
      </section>

      <CategoryThumbnails stats={categoryStats} />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-3 h-min">
        <RecentPhotos />
        <RecentPosts />
      </div>
    </main>
  );
}
