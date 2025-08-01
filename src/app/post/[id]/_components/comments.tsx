"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { UserAvatarWithDetail } from "@/components/user";
import { useAuth, useRequireAuth } from "@/hooks";
import { commentInput, type CommentInput } from "@/lib/schema";
import { cn, getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Comment, type User } from "@prisma/client";
import { SendIcon, XIcon } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

type CommentWithAuthorAndChild = Comment & { author: User } & {
  childs?: CommentWithAuthorAndChild[];
};

type CommentsProps = {
  postId: string;
};

const Comments = ({ postId }: CommentsProps) => {
  const { data } = api.comment.getByPostId.useQuery(postId);
  const [replyTo, setReplyTo] = useState("");
  const commentsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (replyTo !== "" && commentsRef.current) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  return (
    <section id="comments" ref={commentsRef} className="border-t pt-4 min-h-80">
      <h3 className="flex items-center gap-2 mb-4">
        <span>Comments</span>
        <span className="text-muted-foreground text-base">{data?.length}</span>
      </h3>

      <CommentForm
        postId={postId}
        isReply={replyTo !== ""}
        setReplyTo={setReplyTo}
        replyComment={data?.find((comment) => comment.id === replyTo)}
      />

      <div className="space-y-3 mt-6">
        {data?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
          />
        ))}
      </div>
    </section>
  );
};

export default Comments;

type CommentItemProps = {
  comment: CommentWithAuthorAndChild;
  replyTo: string;
  setReplyTo: Dispatch<SetStateAction<string>>;
};

const CommentItem = ({ comment, replyTo, setReplyTo }: CommentItemProps) => {
  return (
    <div
      className={cn(
        "space-y-1 relative",
        comment.childs && "p-2",
        replyTo === comment.id && "bg-cyan-50 rounded-lg",
      )}
    >
      {comment.childs && (
        <>
          <div className="absolute w-[1px] h-[calc(100%-110px)] top-10 left-5 bg-border" />
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-11"
          >
            <path
              d="M12.5 0 V10 Q12 20 22 20"
              strokeWidth="1"
              fill="none"
              className="stroke-border"
            />
          </svg>
        </>
      )}

      <UserAvatarWithDetail
        size="sm"
        user={comment.author}
        time={getRelativeTime(comment.createdAt)}
      />

      <p className="ml-8">{comment.content}</p>

      {comment.childs && (
        <button
          onClick={() =>
            setReplyTo((prev) => (prev === comment.id ? "" : comment.id))
          }
          className="text-muted-foreground text-sm font-base ml-8"
        >
          {comment.id === replyTo ? "Cancel" : "Reply"}
        </button>
      )}

      <div className="ml-8 mt-3 mb-0 space-y-2 empty:hidden">
        {comment.childs?.map((child) => (
          <CommentItem
            key={child.id}
            comment={child}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
          />
        ))}
      </div>
    </div>
  );
};

type CommentFormProps = {
  postId: string;
  isReply: boolean;
  setReplyTo: Dispatch<SetStateAction<string>>;
  replyComment?: CommentWithAuthorAndChild;
};

const CommentForm = ({
  postId,
  isReply,
  setReplyTo,
  replyComment,
}: CommentFormProps) => {
  const { session } = useAuth();
  const requireAuth = useRequireAuth();
  const utils = api.useUtils();

  const form = useForm({
    resolver: zodResolver(commentInput),
    defaultValues: {
      content: "",
      authorId: "anonymous",
    },
    mode: "onChange",
  });

  const mutationAction = {
    onSuccess: async () => {
      await utils.comment.invalidate();
      form.reset();
    },
    onError: async (error: unknown) => {
      toast.error("Failed to create comment!", {
        position: "top-center",
        description: "Please try again later.",
      });
      console.error("Error creating comment:", error);
    },
  };

  const createCommentOnPost =
    api.comment.createOnPost.useMutation(mutationAction);
  const createCommentOnParent =
    api.comment.createOnParent.useMutation(mutationAction);

  const handleSubmit = async (values: CommentInput) => {
    if (!session) return;

    if (isReply) {
      await requireAuth(async () => {
        await createCommentOnParent.mutateAsync({
          content: values.content,
          authorId: session.user.id,
          parentId: replyComment!.id,
        });
      });
    } else {
      await requireAuth(async () => {
        await createCommentOnPost.mutateAsync({
          content: values.content,
          authorId: session.user.id,
          postId: postId,
        });
      });
    }
  };

  return (
    <Form {...form}>
      <form
        id="comment-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-2 scroll-m-20"
      >
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <div className="bg-muted rounded-md px-2 py-2 flex-1 h-fit space-x-1">
              {isReply && (
                <Button
                  variant="ghost"
                  onClick={() => setReplyTo("")}
                  className="cursor-pointer h-6 !px-1 !py-0 gap-1 rounded-md bg-cyan-50 inset-ring inset-ring-border"
                >
                  <XIcon size={16} />
                  <span className="mr-1 text-xs font-medium">
                    Reply to {replyComment?.author.name}
                  </span>
                </Button>
              )}
              <TextareaAutosize
                {...field}
                placeholder="Add comment ..."
                className="focus-visible:outline-none resize-none ml-1 w-full"
              />
            </div>
          )}
        />
        <LoadingButton
          size="icon"
          type="submit"
          disabled={
            form.formState.isSubmitting || !form.formState.isValid || !session
          }
          isLoading={form.formState.isSubmitting}
          className="size-10"
        >
          <SendIcon />
        </LoadingButton>
      </form>
    </Form>
  );
};
