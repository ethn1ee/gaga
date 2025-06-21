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

  const query = searchParams.get("q");

  const [data] = api.post.search.useSuspenseQuery(query!);
  return (
    <>
      <h1 className="mb-4 mt-10">Results for &quot;{query}&quot;</h1>
      <PostTable data={data} />
    </>
  );
};
