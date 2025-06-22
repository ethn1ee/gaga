"use client";

import { PostTable } from "@/components/post";
import { api } from "@/trpc/react";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <Suspense>
      <SuspenseWrapper />
    </Suspense>
  );
};

export default SearchPage;

const SuspenseWrapper = () => {
  const searchParams = useSearchParams();
  if (!searchParams.has("q")) {
    notFound();
  }

  const q = searchParams.get("q");

  const [data, query] = api.post.search.useSuspenseQuery(q!);

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
};
