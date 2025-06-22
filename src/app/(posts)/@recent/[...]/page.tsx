"use client";

import { PostTable } from "@/components/post";
import { api } from "@/trpc/react";

const RecentPosts = () => {
  const [data, query] = api.post.getRecent.useSuspenseQuery();

  return (
    <div className="border rounded-lg p-4">
      <h3>Recent Posts</h3>
      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default RecentPosts;
