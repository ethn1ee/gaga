import FlexibleTextarea from "@/components/flexible-textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { UserAvatarWithTime } from "@/components/user";
import { useAuth } from "@/hooks";
import { type CommentInput, commentInput } from "@/lib/schema";
import { getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Comment, type Post } from "@prisma/client";
import { Loader2Icon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CommentsProps = {
  postId: Post["id"];
  comments: Comment[];
};
const Comments = ({ postId, comments }: CommentsProps) => {
  const { session, isSessionLoading } = useAuth({ protect: false });
  const utils = api.useUtils();

  const form = useForm<CommentInput>({
    resolver: zodResolver(commentInput),
    defaultValues: {
      content: "",
      authorId: "anonymous",
      postId,
    },
  });

  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      await utils.comment.invalidate();
      await utils.post.invalidate();
      form.reset();
    },
    onError: async (error) => {
      toast.error("Failed to post!", {
        position: "top-center",
        description: "Please try again later.",
      });
      console.error(error);
    },
  });

  const handleSubmit = async (values: CommentInput) => {
    createComment.mutate({
      ...values,
      authorId: session?.user.username ?? "anonymous",
    });
  };

  if (isSessionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3 className="mb-3">Comments</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FlexibleTextarea
                {...field}
                placeholder="Add comment ..."
                className="focus-visible:ring-0"
              />
            )}
          />
          <Button
            size="icon"
            type="submit"
            disabled={
              createComment.isPending ||
              !!commentInput.safeParse(form.watch()).error
            }
          >
            {createComment.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <SendIcon />
            )}
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        {comments.map((comment, i) => (
          <div key={i} className="space-y-2">
            <UserAvatarWithTime
              size="small"
              id={comment.authorId}
              time={getRelativeTime(comment.createdAt)}
            />
            <p className="ml-8">{comment.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
