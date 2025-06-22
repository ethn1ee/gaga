import { categoryToArray } from "@/lib/utils/category-to-array";
import { type Post } from "@prisma/client";

type CategoryProps = {
  category: Post["category"];
};

const Category = ({ category }: CategoryProps) => {
  const categoryArray = categoryToArray(category);
  return (
    <div>
      {categoryArray.map((item, i) => (
        <span key={i} className="text-muted-foreground text-sm">
          {item}
        </span>
      ))}
    </div>
  );
};

export default Category;
