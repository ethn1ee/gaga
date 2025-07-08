"use client";

import { PaginatedPostTable } from "@/components/post";
import { useRouter, useSearchParams } from "next/navigation";

const Results = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q");

  if (!q) {
    router.replace("/");
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <PaginatedPostTable
        isLoading={!q}
        query={{
          q,
        }}
        numRows={20}
      />
    </div>
  );
};

export default Results;
