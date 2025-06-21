export const extractOriginalFilename = (url: string): string => {
  const regex = /https:\/\/[^/]+\/(.+?)-[^-]+\.(\w+)$/;
  const result = regex.exec(url);

  return result?.slice(1, 3).join(".") ?? url;
};

export const replaceFileExtension = (
  filename: string,
  target: string,
): string => {
  const regex = /(.+)\.\w+$/;
  const result = regex.exec(filename);

  return result ? result[1] + "." + target : filename;
};
