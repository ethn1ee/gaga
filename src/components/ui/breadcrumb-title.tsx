"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentProps } from "react";

type BreadcrumbTitleProps = {
  primary: string;
  secondary?: string;
  size?: "default" | "sm" | "xs";
  linkPrimary?: string;
  linkSecondary?: string;
};

const BreadcrumbTitle = ({
  primary,
  secondary,
  size = "default",
  linkPrimary,
  linkSecondary,
  className,
}: BreadcrumbTitleProps & ComponentProps<"div">) => {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <h1
        className={cn(
          "space-x-2 block w-fit m-0 border-none shrink-0",
          size === "default" && "text-3xl font-semibold",
          size === "sm" && "text-xl",
          size === "xs" && "text-base",
        )}
      >
        <span className="animate-underline">hello</span>
        {linkPrimary ? (
          <Link
            href={linkPrimary}
            className={cn(
              "animate-underline after:left-0",
              secondary
                ? "text-muted-foreground after:text-muted-foreground"
                : "text-foreground",
            )}
          >
            {primary}
          </Link>
        ) : (
          <span
            className={cn(
              secondary ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {primary}
          </span>
        )}
        {secondary && (
          <>
            <span className="text-muted-foreground">/</span>
            {linkSecondary ? (
              <Link
                href={linkSecondary}
                className="animate-underline after:left-0"
              >
                {secondary}
              </Link>
            ) : (
              <span>{secondary}</span>
            )}
          </>
        )}
      </h1>
    </div>
  );
};

export default BreadcrumbTitle;
