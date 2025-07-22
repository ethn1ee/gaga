import { PostTable } from "@/components/post";
import { api } from "@/trpc/server";

const RecentPosts = async () => {
  const recents = await api.post.getRecent(15);

  return (
    <section id="hot-posts" className="md:basis-2/5 order-1 lg:order-2">
      <span className="block text-lg font-medium mb-2">Recent Posts</span>
      <div className="border p-3 rounded-md grow h-[588px] xl:h-[741.6px] 2xl:h-[895.2px] overflow-hidden">
        <div className="h-full mask-b-from-80% mask-b-to-100%">
          <PostTable data={recents} isLoading={false} size="sm" />
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
