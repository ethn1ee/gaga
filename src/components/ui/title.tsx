import { cn, slugToTitle } from "@/lib/utils";
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
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <h3
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
            {slugToTitle(primary, { isCategory: true })}
          </Link>
        ) : (
          <span
            className={cn(
              secondary ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {slugToTitle(primary, { isCategory: true })}
          </span>
        )}
        {secondary && (
          <>
            <span className="text-muted-foreground">/</span>
            {withLink ? (
              <Link href={`/${primary}/${secondary}`}>
                {slugToTitle(secondary, { isSubcategory: true })}
              </Link>
            ) : (
              <span>{slugToTitle(secondary, { isSubcategory: true })}</span>
            )}
          </>
        )}
      </h3>
    </div>
  );
};

export default Title;
