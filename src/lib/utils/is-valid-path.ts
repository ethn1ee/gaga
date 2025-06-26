"use client";

import { categories } from "@/site-config";

export const isValidPath = (path: string[]) => {
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
