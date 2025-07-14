"use client";

import { PaginatedPostTable } from "@/components/post";
import { useAuth } from "@/hooks";

const Posts = () => {
  const { session, isSessionLoading } = useAuth();

  return (
    <section>
      <h2 className="text-lg border-none font-medium">My Posts</h2>
      <div className="border p-3 rounded-md h-110 flex flex-col justify-between">
        <PaginatedPostTable
          numRows={5}
          mode="data"
          isLoading={isSessionLoading}
          query={{
            authorId: session?.user.id ?? undefined,
          }}
        />
      </div>
    </section>
  );
};

export default Posts;
