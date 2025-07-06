"use client";

import { PostTable } from "@/components/post";
import { useAuth } from "@/hooks";
import { api } from "@/trpc/react";

const MyPosts = () => {
  const { session, isSessionLoading } = useAuth();

  const [posts, query] = api.post.getByUsername.useSuspenseQuery(
    session?.user.username ?? undefined,
  );

  return (
    <section>
      <h2 className="text-lg border-none font-medium">
        My Posts
        <span className="ml-2 text-sm text-muted-foreground font-normal">
          {posts.length}
        </span>
      </h2>
      <div className="border p-3 rounded-md">
        <PostTable
          data={posts}
          isLoading={query.isLoading || isSessionLoading}
        />
      </div>
    </section>
  );
};

export default MyPosts;
