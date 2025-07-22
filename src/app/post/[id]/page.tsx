"use client";

import { PostMenu } from "@/components/post";
import { UserAvatarWithDetail } from "@/components/user";
import { useAuth } from "@/hooks";
import { getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { notFound } from "next/navigation";
import { use, useEffect, useRef } from "react";
import Attachments from "./_components/attachments";
import Carousel from "./_components/carousel";
import Category from "./_components/category";
import Comments from "./_components/comments";
import Content from "./_components/content";
import Title from "./_components/title";

type PostProps = {
  params: Promise<{ id: string }>;
};

const Post = ({ params }: PostProps) => {
  const { id } = use(params);
  const viewIncrementedRef = useRef(false);
  const { data, isLoading, isSuccess } = api.post.getById.useQuery(id);
  const incrementViewMutation = api.post.incrementView.useMutation();
  const { user } = useAuth();

  useEffect(() => {
    if (isSuccess && viewIncrementedRef.current === false) {
      incrementViewMutation.mutate(id);
      viewIncrementedRef.current = true;
    }
  }, [id, incrementViewMutation, viewIncrementedRef, isSuccess]);

  if (!isLoading && !data) {
    notFound();
  }

  return (
    <main className="space-y-10">
      <section id="post">
        <Category
          category={data?.category}
          subcategory={data?.subcategory}
          isLoading={isLoading}
        />
        <Title title={data?.title} isLoading={isLoading} />
        <div className="min-h-200 my-5 flex flex-col gap-5 justify-between">
          <div className="space-y-5">
            <Carousel attachments={data?.attachments} isLoading={isLoading} />
            <Content content={data?.content} isLoading={isLoading} />
          </div>
          <Attachments attachments={data?.attachments} isLoading={isLoading} />
        </div>
      </section>

      <section id="info" className="flex justify-between items-center">
        <UserAvatarWithDetail
          user={data?.author}
          isLoading={isLoading}
          time={data ? getRelativeTime(data.createdAt) : ""}
          size="default"
        />
        {user && data && data?.authorId === user?.id && (
          <PostMenu id={data?.id} />
        )}
      </section>

      <Comments postId={id} />
    </main>
  );
};

export default Post;
