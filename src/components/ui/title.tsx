"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ComponentProps } from "react";

type TitleProps = {
  primary: string;
  secondary?: string;
  size?: "default" | "sm" | "xs";
  withLink?: boolean;
};

const Title = ({
  primary,
  secondary,
  size = "default",
  withLink = false,
  className,
}: TitleProps & ComponentProps<"div">) => {
  const t = useTranslations("category");

  const tPrimary = primary ? t(`${primary}.title`) : undefined;
  const tSecondary = secondary
    ? t(`${primary}.subcategories.${secondary}.title`)
    : undefined;

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
        {withLink ? (
          <Link
            href={`/${primary}`}
            className={cn(
              secondary ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {tPrimary}
          </Link>
        ) : (
          <span
            className={cn(
              secondary ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {tPrimary}
          </span>
        )}
        {secondary && (
          <>
            <span className="text-muted-foreground">/</span>
            {withLink ? (
              <Link href={`/${primary}/${secondary}`}>{tSecondary}</Link>
            ) : (
              <span>{tSecondary}</span>
            )}
          </>
        )}
      </h1>
    </div>
  );
};

export default Title;
