const MAX_STARS_AMOUNT = 5;

export const formatString = (string) => {
  const strings = string.split(` `);
  return strings.map((it) => it[0].toUpperCase() + it.slice(1)).join(` `);
};

export const convertRatingToPersent = (rating) => {
  return `${rating / MAX_STARS_AMOUNT * 100}%`;
};

export const formatReviewDate = (date) => {
  const reviewDate = new Date(date);

  return reviewDate.toLocaleDateString(`en-US`, {year: `numeric`, month: `long`});
};

export const getCityPlaces = (places, city) => {
  return places.filter((place) => place.city.name === city);
};
