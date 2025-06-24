"use client";

import { PostTable } from "@/components/post";
import Title from "@/components/title";
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
    <div className="mt-4">
      <Title
        primary={category}
        secondary={subcategory}
        size="xs"
        withLink
        className="md:hidden absolute top-3.5 left-14 z-30"
      />

      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default Subcategory;
