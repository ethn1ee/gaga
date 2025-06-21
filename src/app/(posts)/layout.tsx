import { Search } from "@/components/search";

const PostsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="px-4">
      <Search />
      {children}
    </main>
  );
};

export default PostsLayout;
