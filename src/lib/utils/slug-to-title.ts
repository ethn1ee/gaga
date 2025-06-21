export const slugToTitle = (slug: string) => {
  return slug
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
};
