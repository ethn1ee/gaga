"use client";

import { PostTable } from "@/components/post";

const General = () => {
  return (
    <main>
      <h1 className="mb-4">General</h1>
      <PostTable category="general" />
    </main>
  );
};

export default General;
