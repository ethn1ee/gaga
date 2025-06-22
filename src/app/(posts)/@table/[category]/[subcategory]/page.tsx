"use client";

import { PostTable } from "@/components/post";
import { slugToTitle } from "@/lib/utils";
import { api } from "@/trpc/react";
import { use } from "react";

type SubcategoryProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

const Subcategory = (props: SubcategoryProps) => {
  const { params } = props;
  const { category, subcategory } = use(params);

  const [data, query] = api.post.getByCategoryAndSubcategory.useSuspenseQuery({
    category,
    subcategory,
  });

  return (
    <div>
      <h1 className="mb-4 space-x-2">
        <span className="text-muted-foreground">{slugToTitle(category)}</span>
        <span className="text-muted-foreground">/</span>
        <span>{slugToTitle(subcategory)}</span>
      </h1>
      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default Subcategory;
