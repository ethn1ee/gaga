"use client";

import { Button } from "@/components/ui/button";
import { Form as FormComponent } from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";
import { postInput, type PostInput } from "@/lib/schema";
import { getNow, replaceFileExtension } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Post } from "@prisma/client";
import { upload } from "@vercel/blob/client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import AttachmentInput from "./attachment";
import CategoryInput from "./category";
import ContentInput from "./content";
import TitleInput from "./title";

const Form = () => {
  const router = useRouter();
  const { session, isSessionLoading } = useAuth();

  const form = useForm<PostInput>({
    resolver: zodResolver(postInput),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      subcategory: "",
      attachments: [],
      authorId: "anonymous",
    },
  });

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const createPost = api.post.create.useMutation({
    onSuccess: async (data: Post) => {
      toast.success("Successfully posted!", {
        position: "top-center",
        description: getNow(),
        action: {
          label: "View",
          onClick: () => router.push(`/post/${data.id}`),
        },
      });
      form.reset();
      router.push(`/post/${data.id}`);
    },
    onError: async (error) => {
      toast.success("Failed to post!", {
        position: "top-center",
        description: "Please try again later",
      });
      console.error(error);
    },
  });

  useEffect(() => {
    if (createPost.isPending) {
      setIsSubmitLoading(true);
    }
  }, [createPost.isPending]);

  const handleSubmit = async (values: PostInput) => {
    console.log(values);
    if (values.category === "photos" && attachments.length === 0) {
      toast.warning("Please attach at least one photo", {
        position: "top-center",
      });
      return;
    }

    setIsSubmitLoading(true);

    const urls = await Promise.all(
      attachments.map(async (file) => {
        let converted = file;

        // convert heic/heif to jpeg
        if (file.type === "image/heic" || file.type === "image/heif") {
          if (typeof window !== "undefined") {
            const heic2any = (await import("heic2any")).default;
            const blob = new Blob([file], { type: file.type });
            const convertedBlob = await heic2any({
              blob,
              toType: "image/jpeg",
              quality: 0.8,
            });
            converted = new File(
              [convertedBlob as Blob],
              replaceFileExtension(file.name, "jpeg"),
              {
                type: "image/jpeg",
              },
            );
          }
        }

        const blob = await upload(converted.name, converted, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
        });

        return blob.url;
      }),
    ).finally(() => setIsSubmitLoading(false));
    createPost.mutate({
      ...values,
      attachments: urls,
      authorId: session?.user.username ?? "",
    });
  };

  if (isSessionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <FormProvider {...form}>
      <FormComponent {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mb-4 flex flex-col gap-5"
        >
          <CategoryInput />
          <TitleInput />
          <ContentInput />
          <AttachmentInput
            attachments={attachments}
            setAttachments={setAttachments}
          />

          <Button
            size="lg"
            type="submit"
            disabled={
              isSubmitLoading || !!postInput.safeParse(form.watch()).error
            }
          >
            {isSubmitLoading ? (
              <>
                <Loader2Icon className="animate-spin" />
                Posting ...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </form>
      </FormComponent>
    </FormProvider>
  );
};

export default Form;
