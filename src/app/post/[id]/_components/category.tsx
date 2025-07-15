import { Skeleton } from "@/components/ui/skeleton";
import { slugToTitle } from "@/lib/utils";
import { type Post } from "@prisma/client";

type CategoryProps = {
  category: Post["category"] | undefined;
  subcategory: Post["subcategory"] | undefined;
  isLoading: boolean;
};

const Category = ({ category, subcategory, isLoading }: CategoryProps) => {
  return (
    <div className="text-muted-foreground text-sm space-x-2">
      {isLoading || !category || !subcategory ? (
        <Skeleton className="h-5 w-40" />
      ) : (
        <>
          <span>{slugToTitle(category, { isCategory: true })}</span>
          <span>/</span>
          <span>{slugToTitle(subcategory, { isSubcategory: true })}</span>
        </>
      )}
    </div>
  );
};

export default Category;
