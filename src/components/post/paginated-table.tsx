"use client";

import { PostTable } from "@/components/post";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { type PostInput, type PostWithComments } from "@/lib/schema";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { type TableMode, type TableSize } from "./table";

const FACTOR = 3 as const;

type PaginatedPostTableProps = {
  numRows: number;
  isLoading: boolean;
  mode?: TableMode;
  size?: TableSize;
  query: Partial<PostInput>;
};

const PaginatedPostTable = ({
  numRows,
  isLoading,
  mode,
  size,
  query,
}: PaginatedPostTableProps) => {
  const [data, setData] = useState<PostWithComments[] | null>(null);
  const [page, setPage] = useState(0);

  const numPages = Math.ceil((data?.length ?? 0) / numRows);
  const isLastPage = page === numPages - 1;

  const {
    data: pages,
    isLoading: isQueryLoading,
    fetchNextPage,
    hasNextPage,
  } = api.post.getBatch.useInfiniteQuery(
    {
      limit: numRows * FACTOR,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!query,
    },
  );

  useEffect(() => {
    if (!pages) return;
    setData(pages.pages.flatMap((d) => d.items));
  }, [pages]);

  const handleFetchNextPage = async () => {
    if (!data) return;

    if (hasNextPage && isLastPage) await fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  const toShow = data?.slice(page * numRows, (page + 1) * numRows) ?? [];

  const enablePrevious = page > 0;
  const enableNext = hasNextPage || !isLastPage;

  return (
    <>
      <PostTable data={toShow} isLoading={isLoading || isQueryLoading} mode={mode} size={size} />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={!enablePrevious}
              onClick={handleFetchPreviousPage}
            >
              Previous
            </Button>
          </PaginationItem>

          {[...Array<0>(numPages)]
            .map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i}
                  onClick={() => setPage(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))
            .slice(
              Math.max(0, page - FACTOR + 1),
              page < FACTOR ? FACTOR : Math.min(numPages, page + 1),
            )}

          {(hasNextPage || numPages > FACTOR) && (
            <PaginationItem>
              {!isLastPage || hasNextPage ? (
                <PaginationEllipsis />
              ) : (
                <div className="size-9" />
              )}
            </PaginationItem>
          )}

          <PaginationItem>
            <Button
              variant="ghost"
              disabled={!enableNext}
              onClick={handleFetchNextPage}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginatedPostTable;
