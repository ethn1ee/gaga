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

type PostTableProps = {
  data: PostWithComments[];
  showCategory?: boolean;
  showSubcategory?: boolean;
  isLoading: boolean;
  size?: "default" | "sm";
};

const PostTable = ({ data, isLoading, size = "default" }: PostTableProps) => {
  if (!isLoading && data?.length === 0) {
    return (
      <div className="text-muted-foreground/50 size-full flex flex-col gap-2 items-center justify-center">
        <BadgeAlertIcon />
        <span>No posts</span>
      </div>
    );
  }

  return (
    <Table data-size={size} className="table-fixed group">
      <TableCaption className="sr-only text-muted-foreground">
        A list of posts.
      </TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-muted-foreground">Title</TableHead>
          <TableHead className="w-20 group-data-[size=sm]:hidden max-md:hidden">
            <span className="sr-only text-muted-foreground">Interactions</span>
          </TableHead>
          <TableHead className="text-center w-12 text-muted-foreground">
            <MessageCircleIcon size={16} className="inline" />
          </TableHead>
          <TableHead className="text-center w-12 text-muted-foreground">
            <EyeIcon size={16} className="inline" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? [...Array<0>(5)].map((_, i) => <PostRowSkeleton key={i} />)
          : data?.map((post, i) => <PostRow key={i} post={post} />)}
      </TableBody>
    </Table>
  );
};

export default PostTable;
