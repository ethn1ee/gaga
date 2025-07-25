"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import { api } from "@/trpc/react";
import { EllipsisIcon, EyeIcon, LinkIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "../ui/loading-button";

type PostMenuProps = {
  id: string;
};

const PostMenu = ({ id }: PostMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const url = `/post/${id}`;
  const utils = api.useUtils();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deletePost = api.post.deleteById.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted!", {
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error("Failed to delete post!", {
        position: "top-center",
        description: "Please try again later",
      });
      console.error(error);
    },
  });

  const handleDelete = async () => {
    await deletePost.mutateAsync(id);
    setIsDeleteDialogOpen(false);
    await utils.invalidate();
    if (pathname === url) {
      router.push("/");
    }
  };

  return (
    <AlertDialog open={isDeleteDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <EllipsisIcon className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(env.NEXT_PUBLIC_BASE_URL + url)
            }
          >
            <LinkIcon />
            Copy Link
          </DropdownMenuItem>
          {pathname !== url && (
            <Link href={url}>
              <DropdownMenuItem>
                <EyeIcon />
                View
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuSeparator />
          <AlertDialogTrigger
            onClick={() => setIsDeleteDialogOpen(true)}
            className="size-full"
          >
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              isLoading={deletePost.isPending}
              onClick={handleDelete}
            >
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostMenu;
