"use client";

import { UserAvatarWithDetail } from "@/components/user";
import { getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { notFound } from "next/navigation";
import { use, useEffect, useRef } from "react";
import { Attachments, Carousel, Category, Comments } from "./_components";

type PostProps = {
  params: Promise<{ id: string }>;
};

const Post = ({ params }: PostProps) => {
  const { id } = use(params);
  const viewIncrementedRef = useRef(false);
  const [data, query] = api.post.getById.useSuspenseQuery(id);
  const incrementViewMutation = api.post.incrementView.useMutation();

  useEffect(() => {
    if (query.isSuccess && viewIncrementedRef.current === false) {
      incrementViewMutation.mutate(id);
      viewIncrementedRef.current = true;
    }
  }, [id, incrementViewMutation, viewIncrementedRef, query.isSuccess]);

  if (!data) {
    notFound();
  }

  if (query.isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <main className="space-y-10">
      <section id="post">
        <Category category={data.category} subcategory={data.subcategory} />
        <h2 className="mb-5 mt-1">{data.title}</h2>
        <Carousel attachments={data.attachments} />
        <p className="min-h-96 my-5">{data.content}</p>
        <Attachments attachments={data.attachments} />
      </section>

      <UserAvatarWithDetail
        user={data.author}
        time={getRelativeTime(data.createdAt)}
        size="default"
      />

      <Comments postId={data.id} comments={data.comments} />
    </main>
  );
};

export default Post;
