"use client";

import { PaginatedPostTable } from "@/components/post";
import { useAuth } from "@/hooks";

const MyPosts = () => {
  const { session, isSessionLoading } = useAuth();

  return (
    <main className="min-h-one-page flex flex-col gap-4 pt-4">
      <h3 className="text-3xl">My Posts</h3>
      <div className="flex-1 flex flex-col justify-between">
        <PaginatedPostTable
          numRows={5}
          mode="data"
          isLoading={isSessionLoading}
          query={{
            authorId: session?.user.id ?? undefined,
          }}
        />
      </div>
    </main>
  );
};

export default MyPosts;
