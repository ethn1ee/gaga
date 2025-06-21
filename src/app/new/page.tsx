"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postInput, type PostInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const New = () => {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<PostInput>({
    resolver: zodResolver(postInput),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      authorId: "admin",
    },
  });

  const createPost = api.post.create.useMutation({
    onSuccess: async (data: Post) => {
      toast("Successfully posted!", {
        description: getNow(),
        action: {
          label: "View",
          onClick: () => router.push(`/post/${data.id}`),
        },
      });

      await utils.post.invalidate();
      router.push(`/post/${data.id}`);
    },
    onError: async (error) => {
      toast("Failed to post!", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (values: PostInput) => {
    createPost.mutate({ ...values });
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mb-4 flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="academics">Academics</SelectItem>
                    <SelectItem value="living">Living</SelectItem>
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Untitled"
                    className="!text-4xl p-0 clear-input-style"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="What's on your mind?"
                    className="!text-lg p-0 min-h-[50vh] h-fit resize-none clear-input-style"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="lg"
            type="submit"
            disabled={
              createPost.isPending || !!postInput.safeParse(form.watch()).error
            }
          >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default New;
