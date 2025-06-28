import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import type { PostWithComments } from "@/lib/schema";
import { getInitials, getRelativeTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

type PostRowProps = {
  post: PostWithComments;
};

const PostRow = ({ post }: PostRowProps) => {
  const router = useRouter();

  function handleClick() {
    router.push(`/post/${post.id}`);
  }

  return (
    <TableRow onClick={handleClick} className="cursor-pointer">
      <TableCell className="truncate ">
        <span className="text-lg group-data-[size=sm]:text-base font-normal">
          {post.title}
        </span>
        <div className="space-x-1 text-muted-foreground text-sm">
          <span>{post.authorId}</span>
          <span>·</span>
          <span>{getRelativeTime(post.createdAt)}</span>
        </div>
      </TableCell>

      <TableCell className="group-data-[size=sm]:hidden max-md:hidden">
        <div className="h-7 py-0.5 flex w-fit">
          {post.comments?.slice(0, 3).map((comment, i) => (
            <Avatar key={i} className="size-6 -ml-1 ring-background ring-2">
              <AvatarImage src={comment.author?.image ?? ""} />
              <AvatarFallback>
                {getInitials(comment.author?.name || "")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-center">{post.comments.length}</TableCell>
      <TableCell className="text-center">152</TableCell>
    </TableRow>
  );
};

export default PostRow;

export const PostRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="truncate">
        <Skeleton className="h-5 mb-1.5 group-data-[size=sm]:h-6 w-60" />
        <Skeleton className="h-4.5 w-40" />
      </TableCell>

      <TableCell className="group-data-[size=sm]:hidden max-md:hidden">
        <div className="h-7 py-0.5 flex -gap-2 w-fit">
          {[...Array<0>(3)].map((_, i) => (
            <Skeleton key={i} className="size-6 ring-background ring-2" />
          ))}
        </div>
      </TableCell>
      <TableCell className="text-center"></TableCell>
      <TableCell className="text-center"></TableCell>
    </TableRow>
  );
};
