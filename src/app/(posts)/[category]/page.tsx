"use client";

import { PostTable } from "@/components/post";
import Title from "@/components/title";
import { isValidPath, slugToTitle } from "@/lib/utils";
import { categories } from "@/sitemap";
import { api } from "@/trpc/react";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

type SubcategoryProps = {
  params: Promise<{ category: string }>;
};

const Subcategory = ({ params }: SubcategoryProps) => {
  const { category } = use(params);
  const router = useRouter();

  useEffect(() => {
    if (!isValidPath([category])) router.replace("/");
  }, [category, router]);

  const [data, query] = api.post.getByCategory.useSuspenseQuery(category);

  const subcategoriesMap = new Map<string, typeof data>();
  categories
    .find((cat) => cat.slug === category.toLowerCase())
    ?.subcategories.forEach((subcat) => subcategoriesMap.set(subcat.slug, []));

  for (const post of data) {
    subcategoriesMap.get(post.subcategory)?.push(post);
  }

  return (
    <div className="w-full">
      <Title
        primary={category}
        size="xs"
        withLink
        className="md:hidden absolute top-3.5 left-14 z-30"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 mt-10">
        {[...subcategoriesMap.entries()]
          .slice(0, 5)
          .map(([subcategory, posts]) => (
            <div key={subcategory}>
              <Link
                href={`/${category}/${subcategory}`}
                className="group text-sm font-medium ml-2 block mb-2 text-muted-foreground"
              >
                {slugToTitle(subcategory, { isSubcategory: true })}
                <ChevronRightIcon
                  size={16}
                  className="inline mb-0.5 ml-1 text-ring group-hover:translate-x-1 transition-all"
                />
              </Link>
              <div className="border rounded-xl px-4 py-2 h-[400px] overflow-hidden">
                <div className="mask-b-from-80% mask-b-to-100% h-full">
                  <PostTable
                    data={posts}
                    isLoading={query.isLoading}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subcategory;
