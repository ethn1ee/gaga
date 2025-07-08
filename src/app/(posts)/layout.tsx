import { Search } from "@/components/search";

import { type ReactNode, Suspense } from "react";

export const experimental_ppr = true;

const PostsLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <main className="flex flex-col gap-4 min-h-one-page pt-4">
      <Suspense>
        <Search />
      </Suspense>

      {children}
    </main>
  );
};

export default PostsLayout;
