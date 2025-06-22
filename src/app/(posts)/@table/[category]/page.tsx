"use client";

import { PostTable } from "@/components/post";
import Title from "@/components/title";
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
      <Title category={category} />
      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default Subcategory;
