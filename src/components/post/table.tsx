"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PostWithComments } from "@/lib/schema";
import { BadgeAlertIcon, EyeIcon, MessageCircleIcon } from "lucide-react";
import PostRow, { PostRowSkeleton } from "./row";

export type TableMode = "default" | "data";
export type TableSize = "default" | "sm";

type PostTableProps = {
  data: PostWithComments[];
  isLoading: boolean;
  mode?: TableMode;
  size?: TableSize;
};

const PostTable = ({
  data,
  isLoading,
  mode = "default",
  size = "default",
}: PostTableProps) => {
  if (!isLoading && data?.length === 0) {
    return (
      <div className="text-muted-foreground/50 size-full flex flex-col gap-2 items-center justify-center">
        <BadgeAlertIcon />
        <span>No posts</span>
      </div>
    );
  }

  return (
    <Table data-size={size} data-mode={mode} className="table-fixed group">
      <TableCaption className="sr-only text-muted-foreground">
        A list of posts.
      </TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-muted-foreground">Title</TableHead>
          <TableHead className="w-20 group-data-[size=sm]:hidden max-md:hidden">
            <span className="sr-only">Interactions</span>
          </TableHead>
          <TableHead className="text-center w-12 text-muted-foreground">
            <MessageCircleIcon size={16} className="inline" />
          </TableHead>
          <TableHead className="text-center w-12 text-muted-foreground">
            <EyeIcon size={16} className="inline" />
          </TableHead>
          <TableHead className="w-12 hidden group-data-[mode=data]:table-cell ">
            <span className="sr-only">Menu</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? [...Array<0>(5)].map((_, i) => <PostRowSkeleton key={i} />)
          : data?.map((post, i) => <PostRow key={i} post={post} mode={mode} />)}
      </TableBody>
    </Table>
  );
};

export default PostTable;
