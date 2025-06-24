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
    <div className="min-h-[50svh] flex flex-col mt-4">
      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default Results;
