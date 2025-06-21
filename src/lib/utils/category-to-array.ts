import { slugToTitle } from "./slug-to-title";

export const categoryToArray = (category: string): string[] => {
  const parts = category.split("/");
  const result = parts.flatMap((part) => [slugToTitle(part), "/"]);
  result.pop();

  return result;
};
