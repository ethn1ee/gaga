import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import type { PostWithComments } from "@/lib/schema";
import { getRelativeTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

type PostRowProps = {
  post: PostWithComments;
};

const PostRow = (props: PostRowProps) => {
  const router = useRouter();

  const { post } = props;

  function handleClick() {
    router.push(`/post/${post.id}`);
  }

  return (
    <TableRow
      onClick={handleClick}
      className="flex items-center cursor-pointer"
    >
      <TableCell>
        <Avatar className="size-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>

      <TableCell className="overflow-hidden flex-1 w-0">
        <span className="block font-medium text-lg overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
          {post.title}
        </span>
        <div className="space-x-1 text-muted-foreground">
          <span>{post.authorId}</span>
          <span>·</span>
          <span>{getRelativeTime(post.createdAt)}</span>
        </div>
      </TableCell>

      <TableCell dir="rtl">
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale w-fit">
          {post.comments.map((comment, i) => (
            <Avatar key={i} className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{comment.authorId}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar className="size-6">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PostRow;
