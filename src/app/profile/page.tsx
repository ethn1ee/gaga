import { PostTable } from "@/components/post";
import { auth } from "@/lib/auth";
import { api } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Avatar from "./avatar";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const user = session.user;
  const posts = await api.post.getByUsername(session.user.username ?? "");

  return (
    <main className="space-y-10">
      <section className="flex gap-6 items-center">
        <Avatar />
        <div>
          <h1 className="text-2xl font-medium">{user.name}</h1>
          <span className="text-muted-foreground">@{user.username}</span>
        </div>
      </section>
      <section>
        <h2 className="text-lg font-medium">
          My Posts{" "}
          <span className="ml-1 text-sm text-muted-foreground font-normal">
            {posts.length}
          </span>
        </h2>
        <PostTable data={posts ?? null} isLoading={false} />
      </section>
    </main>
  );
};

export default Profile;
