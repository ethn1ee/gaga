import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import type { PostWithComments } from "@/lib/schema";
import { getRelativeTime, slugToTitle } from "@/lib/utils";
import { MessageCircleIcon, PaperclipIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type PostRowProps = {
  post: PostWithComments;
};

const PostRow = ({ post }: PostRowProps) => {
  const router = useRouter();

  function handleClick() {
    router.push(`/post/${post.id}`);
  }

  return (
    <TableRow
      onClick={handleClick}
      className="flex cursor-pointer @container items-center h-24 gap-3 px-1"
    >
      <TableCell className="@max-sm:hidden py-3 h-full px-0 @md:pl-1">
        <Avatar className="size-9 mb-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>

      <TableCell className="overflow-hidden py-3 flex-1 w-0 h-full px-0">
        <div className="flex gap-1 mb-1">
          <Badge className="py-[1px] px-1.5">
            {slugToTitle(post.category)}
          </Badge>
          <span className="text-muted-foreground">/</span>
          <Badge variant="outline" className="py-[1px] px-1.5">
            {slugToTitle(post.subcategory)}
          </Badge>
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

      <TableCell className="@max-sm:hidden @md:pr-1 py-3 h-full flex flex-col justify-end items-end px-0">
        <div className="h-[28px] py-0.5 *:data-[slot=avatar]:ring-background flex justify-end -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale w-fit">
          {post.comments?.slice(0, 3).map((comment, i) => (
            <Avatar key={i} className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{comment.authorId}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="text-muted-foreground flex items-center gap-1">
          <PaperclipIcon size={12} />
          <span className="mr-2 font-mono">{post.attachments.length}</span>
          <MessageCircleIcon size={12} />
          <span className="font-mono">{post.comments.length}</span>
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
