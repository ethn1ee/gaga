"use client";

import { PaginatedPostTable } from "@/components/post";
import { useAuth } from "@/hooks";
import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Posts = () => {
  const tTitle = useTranslations("profile.sections.my-posts")("title");
  const { session, isSessionLoading } = useAuth();

  return (
    <section>
      <Link href={`/profile/posts`} className="group ml-2 block mb-2">
        <h2 className="text-lg border-none font-medium inline">{tTitle}</h2>
        <ChevronRightIcon
          size={16}
          className="inline mb-1 ml-1 text-ring group-hover:translate-x-1 transition-all"
        />
      </Link>

      <div className="border p-3 rounded-md h-110 flex flex-col justify-between">
        <PaginatedPostTable
          numRows={5}
          mode="data"
          isLoading={isSessionLoading}
          query={{
            authorId: session?.user.id ?? undefined,
          }}
        />
      </div>
    </section>
  );
};

export default Posts;
