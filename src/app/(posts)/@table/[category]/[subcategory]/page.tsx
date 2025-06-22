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
    <div>
      <Title
        category={category}
        subcategory={subcategory}
        size="xs"
        className="md:hidden absolute top-4 left-14 z-30"
      />
      <Title
        category={category}
        subcategory={subcategory}
        className="max-md:hidden"
      />
      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default Subcategory;
