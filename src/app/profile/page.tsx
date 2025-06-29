"use client";

import { PostTable } from "@/components/post";
import { useAuth } from "@/hooks";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import Avatar from "./avatar";

const Profile = () => {
  const { session, isSessionLoading } = useAuth();
  const router = useRouter();

  if (!isSessionLoading && !session) {
    router.push("/signin");
  }

  const user = session?.user;
  const [posts, query] = api.post.getByUsername.useSuspenseQuery(
    session?.user.username ?? "",
  );

  return (
    <main className="space-y-10">
      <section className="flex gap-6 items-center">
        <Avatar />
        <div>
          <h1 className="text-2xl font-medium">{user?.name}</h1>
          <span className="text-muted-foreground">@{user?.username}</span>
        </div>
      </section>
      <section>
        <h2 className="text-lg font-medium">
          My Posts{" "}
          <span className="ml-1 text-sm text-muted-foreground font-normal">
            {posts.length}
          </span>
        </h2>
        <PostTable data={posts ?? null} isLoading={query.isLoading} />
      </section>
    </main>
  );
};

export default Profile;
