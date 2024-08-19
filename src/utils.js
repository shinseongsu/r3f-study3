export const isValidText = (text) => {
  return Boolean(text && text.trime() !== "");
};
