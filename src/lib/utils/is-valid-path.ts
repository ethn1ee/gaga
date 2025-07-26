import { categories } from "@/site-config";

export const isValidCategory = (path: string[]) => {
  if (path.length === 0 || path[0] === "") return true;

  return categories.some((category) => {
    if (category.slug === path[0]?.toLowerCase()) {
      if (path[1]) {
        if (
          category.subcategories.some(
            (subcategory) => subcategory.slug === path[1]?.toLowerCase(),
          )
        ) {
          return true;
        }
      } else {
        return true;
      }
    }
  });
};
