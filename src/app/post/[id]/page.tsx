"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatarWithTime } from "@/components/user";
import { commentInput, type CommentInput } from "@/lib/schema";
import { getNow, getRelativeTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { SendIcon } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

type PostProps = {
  params: Promise<{ id: string }>;
};

const Post = (props: PostProps) => {
  const { params } = props;
  const { id } = use(params);
  const router = useRouter();
  const utils = api.useUtils();
  const [data] = api.post.getById.useSuspenseQuery(id);

  const defaultComment: CommentInput = {
    content: "",
    authorId: "ethantlee",
    postId: id,
  };

  const [comment, setComment] = useState<CommentInput>(defaultComment);

  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      await utils.comment.invalidate();
      await utils.post.invalidate();
    },
  });

  const handleSubmit = () => {
    createComment.mutate({ ...comment });
    setComment(defaultComment);
    toast("Successfully posted!", {
      description: getNow(),
      action: {
        label: "View",
        onClick: () => router.push("/general"),
      },
    });
  };

  if (!data) {
    notFound();
  }

  return (
    <main className="space-y-6">
      {/* POST */}
      <div className="space-y-5">
        <h2>{data.title}</h2>
        <p className="min-h-96">{data.content}</p>
        <UserAvatarWithTime
          id={data.authorId}
          time={getRelativeTime(data.createdAt)}
        />
      </div>

      {/* COMMENTS */}
      <h3 className="mb-2">Comments</h3>
      <div className="flex gap-2">
        <Input
          value={comment.content}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Add comment ..."
          className="focus-visible:ring-0"
        />
        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={
            createComment.isPending || !!commentInput.safeParse(comment).error
          }
        >
          <SendIcon />
        </Button>
      </div>
      <div className="space-y-4">
        {data.comments.map((comment, i) => (
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
    </main>
  );
};

export default Post;
