"use client";

import { PaginatedPostTable } from "@/components/post";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Results = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q");

  useEffect(() => {
    if (!q) {
      router.replace("/");
      return;
    }
  }, [router, q]);

  return (
    <div className="flex-1 flex flex-col justify-between">
      {q && <PaginatedPostTable isLoading={!q} query={{ q }} numRows={20} />}
    </div>
  );
};

export default Results;
