import { PostTable } from "@/components/post";
import Title from "@/components/title";
import { api } from "@/trpc/server";

const RecentPosts = async () => {
  const data = await api.post.getRecent(10);

  return (
    <div className="border rounded-lg p-4">
      <Title category="Recent Posts" size="sm" />
      <PostTable data={data} isLoading={false} />
    </div>
  );
};

export default RecentPosts;
