"use client";

import { api } from "@/trpc/react";
import { use } from "react";

type PostProps = {
  params: Promise<{ id: string }>;
};

const Post = (props: PostProps) => {
  const { params } = props;
  const { id } = use(params);

  const [data] = api.post.getById.useSuspenseQuery({ id: id });

  return <main>{data?.content}</main>;
};

export default Post;
