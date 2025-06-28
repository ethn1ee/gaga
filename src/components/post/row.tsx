import { TableCell, TableRow } from "@/components/ui/table";
import type { PostWithComments } from "@/lib/schema";
import { formatNumber, getRelativeTime } from "@/lib/utils";
import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { UserAvatar } from "../user";

type PostRowProps = {
  post: PostWithComments;
};

const PostRow = ({ post }: PostRowProps) => {
  const router = useRouter();
  const uniqueCommenters = post.comments.reduce((acc, comment) => {
    if (!acc.some((user) => user.username === comment.authorId)) {
      acc.push(comment.author);
    }
    return acc;
  }, [] as User[]);

  const handleClick = () => {
    router.push(`/post/${post.id}`);
  };

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
          {uniqueCommenters
            ?.slice(0, 3)
            .map((user) => (
              <UserAvatar
                key={user.username}
                user={user}
                className="size-6 ring-2 ring-background not-first:-ml-1"
              />
            ))}
        </div>
      </TableCell>
      <TableCell className="text-center">
        {formatNumber(post.comments.length)}
      </TableCell>
      <TableCell className="text-center">{formatNumber(post.views)}</TableCell>
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
        <div className="h-7 py-0.5 flex w-fit">
          {[...Array<0>(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="size-6 ring-2 ring-background not-first:-ml-1 rounded-full"
            />
          ))}
        </div>
      </TableCell>
      <TableCell className="text-center"></TableCell>
      <TableCell className="text-center"></TableCell>
    </TableRow>
  );
};
