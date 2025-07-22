export const parseIdentifier = (identifier: string) => {
  const [, id, emoryEmail] = identifier.split("-");
  return { id, emoryEmail };
};
