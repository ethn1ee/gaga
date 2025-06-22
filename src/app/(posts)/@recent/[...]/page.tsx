"use client";

import { PostTable } from "@/components/post";
import Title from "@/components/title";
import { api } from "@/trpc/react";

const RecentPosts = () => {
  const [data, query] = api.post.getRecent.useSuspenseQuery();

  return (
    <div className="border rounded-lg p-4">
      <Title category="Recent Posts" size="small" />
      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default RecentPosts;
