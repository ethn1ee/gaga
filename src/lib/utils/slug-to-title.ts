import { categories } from "@/sitemap";

type SlugtoTitleOptions = {
  isCategory?: boolean;
  isSubcategory?: boolean;
};

export const slugToTitle = (slug: string, options: SlugtoTitleOptions = {}) => {
  if (options?.isCategory) {
    const category = categories.find((category) => category.slug === slug);
    if (category) {
      return category.name;
    }
  }

  if (options?.isSubcategory) {
    for (const { subcategories } of categories) {
      for (const subcategory of subcategories) {
        if (subcategory.slug === slug) {
          return subcategory.name;
        }
      }
    }
  }

  return slug
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
};
