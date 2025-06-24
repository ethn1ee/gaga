import { slugToTitle } from "@/lib/utils";
import { type Post } from "@prisma/client";

type CategoryProps = {
  category: Post["category"];
  subcategory: Post["subcategory"];
};

const Category = ({ category, subcategory }: CategoryProps) => {
  return (
    <div className="text-muted-foreground text-sm space-x-2">
      <span>{slugToTitle(category, { isCategory: true })}</span>
      <span>/</span>
      <span>{slugToTitle(subcategory, { isSubcategory: true })}</span>
    </div>
  );
};

export default Category;
