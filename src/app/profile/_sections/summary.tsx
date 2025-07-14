"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/user";
import { useAuth } from "@/hooks";
import { authClient } from "@/lib/auth";
import { getFileType, uploadFile } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const Summary = () => {
  const { session, isSessionLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (!e.target.files || e.target.files.length === 0) {
      setIsLoading(false);
      return;
    }

    const file = e.target.files[0]!;

    if (getFileType(file.name) !== "image") {
      toast.error("Selected file is not an image.", {
        position: "top-center",
      });
      setIsLoading(false);
      return;
    }

    const url = await uploadFile(file);

    await authClient
      .updateUser({
        image: url,
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="flex gap-6 items-center">
      <div className="relative">
        <div className="size-32 bg-muted rounded-full flex items-center justify-center">
          <UserAvatar
            user={session?.user}
            isLoading={isLoading || isSessionLoading}
            className="size-full"
          />
        </div>

        <Label
          htmlFor="avatar"
          className="cursor-pointer absolute right-0 bottom-0"
        >
          <div className="rounded-full size-8 flex items-center justify-center bg-background border hover:shadow transition-all">
            <PencilIcon size={12} />
          </div>
        </Label>

        <Input
          id="avatar"
          type="file"
          onChange={handleAvatarChange}
          className="hidden"
        />
      </div>
      <div>
        <h1 className="text-2xl font-medium">{session?.user.name}</h1>
        <span className="text-muted-foreground">
          Joined{" "}
          {session?.user.createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </section>
  );
};

export default Summary;
