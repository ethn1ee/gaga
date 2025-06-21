"use client";

import { PostTable } from "@/components/post";
import { use } from "react";

type PostsProps = {
  params: Promise<{ category: string[] }>;
};
const Posts = (props: PostsProps) => {
  const { params } = props;
  const { category } = use(params);

  return (
    <main>
      <h1 className="mb-4">{category.join("/")}</h1>
      <PostTable category={category.join("/")} />
    </main>
  );
};

export default Posts;
