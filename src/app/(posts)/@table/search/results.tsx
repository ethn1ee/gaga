"use client";

import { PostTable } from "@/components/post";
import { api } from "@/trpc/react";
import { notFound, useSearchParams } from "next/navigation";

const Results = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  if (!q) {
    notFound();
  }

  const [data, query] = api.post.search.useSuspenseQuery(q);

  return (
    <div>
      <h1 className="mb-4 mt-10">Results for &quot;{q}&quot;</h1>
      <PostTable
        data={data}
        isLoading={query.isLoading}
        showCategory
        showSubcategory
      />
    </div>
  );
}

export default Results