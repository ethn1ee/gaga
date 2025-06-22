"use client";

import type { PostWithComments } from "@/lib/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PostRow, { PostRowSkeleton } from "./row";

type PostTableProps = {
  data: PostWithComments[];
  showCategory?: boolean;
  showSubcategory?: boolean;
  isLoading: boolean;
};

const PostTable = ({ data, isLoading }: PostTableProps) => {
  if (!isLoading && data.length === 0) {
    return <p className="text-muted-foreground">No posts</p>;
  }

  return (
    <Table className="w-full overflow-x-hidden @container">
      <TableCaption className="sr-only">A list of posts.</TableCaption>
      <TableHeader className="sr-only">
        <TableRow>
          <TableHead className="w-[100px] @max-sm:hidden">Author</TableHead>
          <TableHead>Post Title</TableHead>
          <TableHead className="text-right @max-sm:hidden">
            Recent commenters
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {isLoading
          ? [...Array<0>(5)].map((_, i) => <PostRowSkeleton key={i} />)
          : data.map((post, i) => <PostRow key={i} post={post} />)}
      </TableBody>
    </Table>
  );
};

export default PostTable;
