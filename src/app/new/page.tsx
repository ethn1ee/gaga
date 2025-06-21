"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postInput, type PostInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const New = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const [post, setPost] = useState<PostInput>(defaultPost);

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  const handleSubmit = () => {
    createPost.mutate({ ...post });
    setPost(defaultPost);
    toast("Successfully posted!", {
      description: getNow(),
      action: {
        label: "View",
        onClick: () => router.push("/general"),
      },
    });
  };

  // autosize textarea
  useEffect(() => {
    const textareas = document.querySelectorAll("textarea");
    const handleInput = function (this: HTMLTextAreaElement) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    };

    textareas.forEach((textarea) => {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "hidden";
    });

    textareas.forEach((textarea) => {
      textarea.addEventListener("input", handleInput);
    });

    return () => {
      textareas.forEach((textarea) => {
        textarea.removeEventListener("input", handleInput);
      });
    };
  }, []);

  return (
    <main>
      <div className="mb-4 flex flex-col gap-5">
        <Label htmlFor="post-title" className="sr-only">
          Title
        </Label>
        <Input
          id="post-title"
          type="text"
          placeholder="Untitled"
          value={post.title}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, title: e.target.value }))
          }
          className="!text-4xl p-0 !bg-transparent border-none ring-0 shadow-none focus-visible:ring-0"
        />

        <Textarea
          placeholder="What's on your mind?"
          value={post.content}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, content: e.target.value }))
          }
          className="!text-lg p-0 min-h-[50vh] h-fit resize-none !bg-transparent border-none ring-0 shadow-none focus-visible:ring-0"
        />

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={createPost.isPending || !!postInput.safeParse(post).error}
        >
          Submit
        </Button>
      </div>
    </main>
  );
};

export default New;

const defaultPost: PostInput = {
  title: "",
  content: "",
  category: "general",
  authorId: "ethantlee",
};
