import { cn, slugToTitle } from "@/lib/utils";

type TitleProps = {
  category: string;
  subcategory?: string;
  size?: "default" | "small";
};

const Title = ({ category, subcategory, size = "default" }: TitleProps) => {
  const TitleTag = size === "small" ? "h3" : "h1";

  return (
    <div
      className={cn(
        "w-full flex gap-4 items-center",
        size === "default" && "mb-4",
      )}
    >
      <TitleTag className="space-x-2 block w-fit shrink-0">
        <span
          className={cn(
            subcategory ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {slugToTitle(category)}
        </span>
        {subcategory && (
          <>
            <span className="text-muted-foreground">/</span>
            <span>{slugToTitle(subcategory)}</span>
          </>
        )}
      </TitleTag>
      {size === "default" && <hr className="h-0.5 bg-accent w-full" />}
    </div>
  );
};

export default Title;
