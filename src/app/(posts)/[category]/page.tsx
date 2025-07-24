"use client";

import { PostTable } from "@/components/post";
import { categories } from "@/site-config";
import { api } from "@/trpc/react";
import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { use } from "react";

type CategoryProps = {
  params: Promise<{ category: string }>;
};

const Category = ({ params }: CategoryProps) => {
  const t = useTranslations("category");
  const { category } = use(params);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 mt-4">
        {[...subcategoriesMap.entries()]
          .slice(0, 5)
          .map(([subcategory, posts]) => (
            <div key={subcategory}>
              <Link
                href={`/${category}/${subcategory}`}
                className="group text-sm font-medium ml-2 block mb-2 text-muted-foreground"
              >
                {t(`${category}.subcategories.${subcategory}.title`)}
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

export default Category;
