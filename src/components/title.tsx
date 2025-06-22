import { cn, slugToTitle } from "@/lib/utils";
import Link from "next/link";
import { type ComponentProps, createElement } from "react";

type TitleProps = {
  category: string;
  subcategory?: string;
  size?: "default" | "sm" | "xs";
};

const Title = ({
  category,
  subcategory,
  size = "default",
  className,
}: TitleProps & ComponentProps<"div">) => {
  const titleTags = {
    default: "h1",
    sm: "h3",
    xs: "span",
  } as const;

  const titleTag = titleTags[size] ?? "h1";

  return (
    <div
      className={cn(
        "w-full flex gap-4 items-center",
        size === "default" && "md:mb-4",
        className,
      )}
    >
      {createElement(
        titleTag,
        { className: "space-x-2 block w-fit shrink-0" },
        <Link
          href={`/${category}`}
          className={cn(
            subcategory ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {slugToTitle(category)}
        </Link>,
        subcategory && (
          <Link href={`/${category}/${subcategory}`}>
            <span className="text-muted-foreground">/</span>
            <span>{slugToTitle(subcategory)}</span>
          </Link>
        ),
      )}
      {size === "default" && <hr className="h-0.5 bg-accent w-full" />}
    </div>
  );
};

export default Title;
