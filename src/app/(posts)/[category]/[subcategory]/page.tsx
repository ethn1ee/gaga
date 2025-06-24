"use client";

import { PostTable } from "@/components/post";
import Title from "@/components/title";
import { isValidPath } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

type SubcategoryProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

const Subcategory = ({ params }: SubcategoryProps) => {
  const { category, subcategory } = use(params);
  const router = useRouter();

  useEffect(() => {
    if (!isValidPath([category, subcategory])) router.replace("/");
  }, [category, subcategory, router]);

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
