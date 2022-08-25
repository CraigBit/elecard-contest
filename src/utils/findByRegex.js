export const findByRegex = (string) => {
  let regexp = /(?<=([a-z]\/))[a-z]+/;
  const nameRegex = string.match(regexp)[0].toLowerCase();

  return nameRegex;
};
