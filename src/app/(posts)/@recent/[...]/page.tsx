"use client";

import { PostTable } from "@/components/post";
import Title from "@/components/title";
import { api } from "@/trpc/react";

export const dynamic = "force-dynamic";

const RecentPosts = () => {
  const [data, query] = api.post.getRecent.useSuspenseQuery(10);

  return (
    <div className="border rounded-lg p-4">
      <Title category="Recent Posts" size="sm" />
      <PostTable data={data} isLoading={query.isLoading} />
    </div>
  );
};

export default RecentPosts;
