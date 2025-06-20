"use client";

import { PostTable } from "@/components/post";
import { LatestPost } from "../_components/post";

const General = () => {
  return (
    <main className="pt-10 md:pt-20">
      <h1 className="mb-4">General</h1>
      <PostTable category="general" />
      <LatestPost />
    </main>
  );
};

export default General;
