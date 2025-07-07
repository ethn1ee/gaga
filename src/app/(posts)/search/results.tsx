"use client";

import { PaginatedPostTable } from "@/components/post";
import { notFound, useSearchParams } from "next/navigation";

const Results = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  if (!q) {
    notFound();
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
