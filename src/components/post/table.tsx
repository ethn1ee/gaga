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
import PostRow from "./row";

type PostTableProps = {
  data: PostWithComments[];
};

const PostTable = (props: PostTableProps) => {
  const { data } = props;

  return (
    <Table className="w-full overflow-x-hidden">
      <TableCaption className="sr-only">
        A list of your recent invoices.
      </TableCaption>
      <TableHeader className="sr-only">
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {data.map((post, i) => (
          <PostRow key={i} post={post} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTable;
