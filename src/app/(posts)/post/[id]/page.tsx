"use client";

import { UserAvatarWithTime } from "@/components/user";
import { getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { notFound } from "next/navigation";
import { use } from "react";
import Attachments from "./attachments";
import Category from "./category";
import Comments from "./comments";

type PostProps = {
  params: Promise<{ id: string }>;
};

const Post = ({ params }: PostProps) => {
  const { id } = use(params);

  const [data] = api.post.getById.useSuspenseQuery(id);

  if (!data) {
    notFound();
  }

  return (
    <main className="space-y-10">
      {/* POST */}
      <div>
        <Category {...data} />
        <h2 className="mb-5">{data.title}</h2>
        <p className="min-h-96 mb-5">{data.content}</p>
        <Attachments attachments={data.attachments} />
      </div>

      <UserAvatarWithTime
        id={data.authorId}
        time={getRelativeTime(data.createdAt)}
      />

      <Comments postId={data.id} comments={data.comments} />
    </main>
  );
};

export default Post;
