"use client";

import { PostTable } from "@/components/post";
import { cn } from "@/lib/utils";
import { categoryToArray } from "@/lib/utils/category-to-array";
import { api } from "@/trpc/react";
import { use } from "react";

type PostsProps = {
  params: Promise<{ category: string[] }>;
};
const Posts = (props: PostsProps) => {
  const { params } = props;
  const { category } = use(params);
  const [data] = api.post.getByCategory.useSuspenseQuery(category.join("/"));
  const categoryArray = categoryToArray(category.join("/"));
  return (
    <div>
      <h1 className="mb-4 mt-10 space-x-2">
        {categoryArray.map((item, i) => {
          const formatted = item;
          const isLast = i === categoryArray.length - 1;
          return (
            <span
              key={i}
              className={cn(
                isLast ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {formatted.slice(0, 1).toUpperCase() + formatted.slice(1)}
            </span>
          );
        })}
      </h1>
      <PostTable data={data} />
    </div>
  );
};

export default Posts;
