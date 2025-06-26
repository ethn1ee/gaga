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
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

type CommentsProps = {
  postId?: Post["id"];
  parentId?: Comment["id"];
  comments: (Comment & { childs: Comment[] })[];
};

const Comments = ({ postId, parentId, comments }: CommentsProps) => {
  const { session, isSessionLoading } = useAuth();
  const requireAuth = useRequireAuth();
  const utils = api.useUtils();

  const form = useForm<CommentInput>({
    resolver: zodResolver(commentInput),
    defaultValues: {
      content: "",
      authorId: "anonymous",
      postId,
      parentId,
    },
  });

  const createCommentOnPost = api.comment.createOnPost.useMutation({
    onSuccess: async () => {
      await utils.comment.invalidate();
      await utils.post.invalidate();
      form.reset();
    },
    onError: async (error) => {
      toast.error("Failed to create comment!", {
        position: "top-center",
        description: "Please try again later.",
      });
      console.error(error);
    },
  });

  const createCommentOnParent = api.comment.createOnParent.useMutation({
    onSuccess: async () => {
      await utils.comment.invalidate();
      await utils.post.invalidate();
      form.reset();
    },
    onError: async (error) => {
      toast.error("Failed to create comment!", {
        position: "top-center",
        description: "Please try again later.",
      });
      console.error(error);
    },
  });

  const handleSubmit = async (values: CommentInput) => {
    requireAuth(() => {
      if (values.postId) {
        return createCommentOnPost.mutate({
          content: values.content,
          postId: values.postId,
          authorId: session?.user.username ?? "anonymous",
        });
      }
      if (values.parentId) {
        return createCommentOnParent.mutate({
          content: values.content,
          parentId: values.parentId,
          authorId: session?.user.username ?? "anonymous",
        });
      }

      return console.error("Either postId or parentId is required");
    });
  };

  if (isSessionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="comments" className="border-t pt-4 min-h-80">
      <h3 className="flex items-center gap-2 mb-4">
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
              <TextareaAutosize
                {...field}
                placeholder="Add comment ..."
                className="focus-visible:outline-none bg-muted rounded-md px-3 py-2 flex-1 resize-none"
              />
            )}
          />
          <Button
            size="icon"
            type="submit"
            disabled={
              createCommentOnPost.isPending ||
              !!commentInput.safeParse(form.watch()).error
            }
            className="size-10"
          >
            {createCommentOnPost.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <SendIcon />
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-4 mt-6">
        {comments.map((comment, i) => (
          <CommentItem key={i} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default Comments;

type CommentItemProps = {
  comment: Comment & { childs: Comment[] };
};
const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="space-y-1">
      <UserAvatarWithTime
        size="sm"
        id={comment.authorId}
        time={getRelativeTime(comment.createdAt)}
      />
      <p className="ml-8">{comment.content}</p>
      <div className="ml-8">
        {comment.childs.map((child, i) => (
          <div key={i}>{child.content}</div>
        ))}
        <span className="text-muted-foreground text-sm">Reply</span>
      </div>
    </div>
  );
};
