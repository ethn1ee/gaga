import { Search } from "@/components/search";
import { Suspense } from "react";

export const experimental_ppr = true;

const PostsLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <main>
      <Suspense>
        <Search />
      </Suspense>

      {children}
    </main>
  );
};

export default PostsLayout;
