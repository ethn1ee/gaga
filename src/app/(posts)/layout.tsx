import { Search } from "@/components/search";
import { Suspense } from "react";

const PostsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="px-4">
      <Suspense>
        <Search />
      </Suspense>
      {children}
    </main>
  );
};

export default PostsLayout;
