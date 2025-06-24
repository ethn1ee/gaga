import FlexibleTextarea from "@/components/flexible-textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { UserAvatarWithTime } from "@/components/user";
import { useAuth, useRequireAuth } from "@/hooks";
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
  const { session, isSessionLoading } = useAuth();
  const requireAuth = useRequireAuth();
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
    requireAuth(() =>
      createComment.mutate({
        ...values,
        authorId: session?.user.username ?? "anonymous",
      }),
    );
  };

  if (isSessionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section
      id="comments"
      className="border-t pt-4 flex flex-col gap-5 min-h-80"
    >
      <h3 className="flex items-center gap-2">
        <span>Comments</span>
        <span className="text-muted-foreground text-base">
          {comments.length}
        </span>
      </h3>

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
              size="sm"
              id={comment.authorId}
              time={getRelativeTime(comment.createdAt)}
            />
            <p className="ml-8">{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;
