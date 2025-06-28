import { PostTable } from "@/components/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import { api } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const user = await api.user.getByUsername(session.user.username!);

  return (
    <main className="space-y-10">
      <section className="flex gap-6 items-center">
        <Avatar className="size-32">
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h1>{session?.user.name}</h1>
        </div>
      </section>
      <section>
        <h2 className="text-lg">My Posts</h2>
        <PostTable data={user?.posts ?? null} isLoading={false} />
      </section>
    </main>
  );
};

export default Profile;
