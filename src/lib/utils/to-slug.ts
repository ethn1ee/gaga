export const toSlug = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, "-");
};
