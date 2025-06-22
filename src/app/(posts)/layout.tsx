import { Search } from "@/components/search";
import { Suspense } from "react";

type PostsLayoutProps = {
  table: React.ReactNode;
  recent: React.ReactNode;
};

const PostsLayout = ({ table, recent }: Readonly<PostsLayoutProps>) => {
  return (
    <main className="px-4">
      <Suspense>
        <Search />
      </Suspense>
      <div className="grid grid-cols-7 mt-10 gap-5">
        <div className="col-span-7 md:col-span-5">{table}</div>
        <div className="col-span-2 hidden md:block">{recent}</div>
      </div>
    </main>
  );
};

export default PostsLayout;
