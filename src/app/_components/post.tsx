"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import type { PostFormData } from "@/lib/types/comment";
import { api } from "@/trpc/react";

const defaultPost: PostFormData = {
  title: "",
  content: "",
  category: "",
  authorId: "",
};

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [post, setPost] = useState<PostFormData>(defaultPost);
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setPost(defaultPost);
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.title}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ ...post });
        }}
        className="flex flex-col gap-2"
      >
        <Input
          type="text"
          value={post.title}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Input
          type="text"
          value={post.content}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <Input
          type="text"
          value={post.category}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, category: e.target.value }))
          }
        />
        <Input
          type="text"
          value={post.authorId}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, authorId: e.target.value }))
          }
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
