const MAX_STARS_AMOUNT = 5;

export const formatString = (string) => {
  const strings = string.split(` `);
  return strings.map((it) => it[0].toUpperCase() + it.slice(1)).join(` `);
};

export const convertRatingToPersent = (rating) => {
  return `${rating / MAX_STARS_AMOUNT * 100}%`;
};
