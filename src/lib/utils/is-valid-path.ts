import { categories } from "@/sitemap";

export const isValidPath = (path: string[]) => {
  return categories.some((category) => {
    if (category.slug === path[0]) {
      if (path[1]) {
        if (
          category.subcategories.some(
            (subcategory) => subcategory.slug === path[1],
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
