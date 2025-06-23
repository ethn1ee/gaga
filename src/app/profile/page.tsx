"use client";

import { PostTable } from "@/components/post";
import useAuth from "@/hooks/use-auth";
import { api } from "@/trpc/react";

const Profile = () => {
  const { session, isSessionLoading } = useAuth();

  const postsQuery = api.post.getByAuthorId.useQuery(session?.user?.id ?? "", {
    enabled: !!session?.user?.id,
  });

  return (
    <main>
      <PostTable
        data={postsQuery.data ?? []}
        isLoading={isSessionLoading || postsQuery.isLoading}
      />
    </main>
  );
};

export default Profile;
