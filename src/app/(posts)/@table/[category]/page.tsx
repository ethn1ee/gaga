"use client";

import { PostTable } from "@/components/post";
import { slugToTitle } from "@/lib/utils";
import { api } from "@/trpc/react";
import { use } from "react";

type SubcategoryProps = {
  params: Promise<{ category: string }>;
};

const Subcategory = (props: SubcategoryProps) => {
  const { params } = props;
  const { category } = use(params);

  const [data, query] = api.post.getByCategory.useSuspenseQuery(category);

  return (
    <div>
      <h1 className="mb-4">{slugToTitle(category)}</h1>
      <PostTable data={data} isLoading={query.isLoading} showSubcategory />
    </div>
  );
};

export default Subcategory;
