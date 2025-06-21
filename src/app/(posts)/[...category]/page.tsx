"use client";

import { PostTable } from "@/components/post";
import { cn, slugToTitle } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Fragment, use } from "react";

type PostsProps = {
  params: Promise<{ category: string[] }>;
};
const Posts = (props: PostsProps) => {
  const { params } = props;
  const { category } = use(params);
  const [data] = api.post.getByCategory.useSuspenseQuery(category.join("/"));

  return (
    <div>
      <h1 className="mb-4 mt-10">
        {category.map((part, i) => {
          const formatted = slugToTitle(part);
          const isLast = i === category.length - 1;
          return (
            <Fragment key={i}>
              <span className={cn(isLast ? "" : "text-muted-foreground")}>
                {formatted.slice(0, 1).toUpperCase() + formatted.slice(1)}
              </span>
              {!isLast && <span className="mx-2 text-muted-foreground">/</span>}
            </Fragment>
          );
        })}
      </h1>
      <PostTable data={data} />
    </div>
  );
};

export default Posts;
