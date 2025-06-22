import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import type { PostWithComments } from "@/lib/schema";
import { getRelativeTime, slugToTitle } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

type PostRowProps = {
  post: PostWithComments;
  showCategory: boolean;
  showSubcategory: boolean;
};

const PostRow = ({ post, showCategory, showSubcategory }: PostRowProps) => {
  const router = useRouter();

  function handleClick() {
    router.push(`/post/${post.id}`);
  }

  return (
    <TableRow
      onClick={handleClick}
      className="flex items-center cursor-pointer @container"
    >
      <TableCell className="@max-sm:hidden">
        <Avatar className="size-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>

      <TableCell className="overflow-hidden flex-1 w-0">
        <div className="flex gap-1">
          {showCategory && (
            <Badge className="">{slugToTitle(post.category)}</Badge>
          )}
          {showSubcategory && (
            <Badge variant="outline" className="">
              {slugToTitle(post.subcategory)}
            </Badge>
          )}
        </div>
        <span className="block font-medium text-lg overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
          {post.title}
        </span>
        <div className="space-x-1 text-muted-foreground">
          <span>{post.authorId}</span>
          <span>·</span>
          <span>{getRelativeTime(post.createdAt)}</span>
        </div>
      </TableCell>

      <TableCell dir="rtl" className="@max-sm:hidden">
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale w-fit">
          {post.comments?.slice(0, 3).map((comment, i) => (
            <Avatar key={i} className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{comment.authorId}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PostRow;

export const PostRowSkeleton = () => {
  return (
    <TableRow className="flex items-center cursor-pointer @container">
      <TableCell className="@max-sm:hidden">
        <Skeleton className="size-9 rounded-full" />
      </TableCell>

      <TableCell className="overflow-hidden flex-1 w-0">
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-4 w-32" />
      </TableCell>

      <TableCell dir="rtl">
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale w-fit">
          {[...Array<0>(2)].map((_, i) => (
            <Skeleton
              key={i}
              className="size-6 rounded-full ring-2 ring-background"
            />
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
};
