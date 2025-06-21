import { Search } from "@/components/search";

const PostsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="px-4">
      <Search />
      {children}
    </div>
  );
};

export default PostsLayout;
