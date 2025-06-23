import { cn, slugToTitle } from "@/lib/utils";
import Link from "next/link";
import { type ComponentProps } from "react";

type TitleProps = {
  category: string;
  subcategory?: string;
  size?: "default" | "sm" | "xs";
  withLink?: boolean;
};

const Title = ({
  category,
  subcategory,
  size = "default",
  withLink = false,
  className,
}: TitleProps & ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex gap-4 items-center",
        size === "default" && "md:mb-4",
        className,
      )}
    >
      <h3
        className={cn(
          "space-x-2 block w-fit m-0 border-none shrink-0",
          size === "default" && "text-2xl font-semibold",
          size === "sm" && "text-xl",
          size === "xs" && "text-base",
        )}
      >
        {withLink ? (
          <Link
            href={`/${category}`}
            className={cn(
              subcategory ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {slugToTitle(category)}
          </Link>
        ) : (
          <span
            className={cn(
              subcategory ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {slugToTitle(category)}
          </span>
        )}
        {subcategory && (
          <>
            <span className="text-muted-foreground">/</span>
            {withLink ? (
              <Link href={`/${category}/${subcategory}`}>
                {slugToTitle(subcategory)}
              </Link>
            ) : (
              <span>{slugToTitle(subcategory)}</span>
            )}
          </>
        )}
      </h3>
      {size === "default" && <hr className="h-0.5 bg-accent w-full" />}
    </div>
  );
};

export default Title;
