const MAX_STARS_AMOUNT = 5;

export const getCitiesList = (offers) => {
  const cities = [];
  offers.forEach((place) => cities.push(place.city.name));
  return Array.from(new Set(cities));
};

export const capitalizeString = (string) => string[0].toUpperCase() + string.slice(1);

export const formatString = (string) => {
  const strings = string.split(` `);
  return strings.map((it) => capitalizeString(it)).join(` `);
};

export const convertRatingToPersent = (rating) => {
  return `${Math.round(rating) / MAX_STARS_AMOUNT * 100}%`;
};

export const formatReviewDate = (date) => {
  const reviewDate = new Date(date);

  return reviewDate.toLocaleDateString(`en-US`, {year: `numeric`, month: `long`});
};

export const formatReviewDateTime = (date) => {
  return new Date(date).toLocaleDateString(`en-US`);
};

export const getCityPlaces = (places, city) => {
  return places.filter((place) => place.city.name === city);
};

export const sortReviewsByDate = (reviews) => {
  reviews.sort((review1, review2) => {
    return new Date(review2.date) - new Date(review1.date);
  });
};

export const updateOffers = (offers, offerItem) => {
  const index = offers.findIndex((offer) => offer.id === offerItem.id);

  if (index === -1) {
    return offers;
  }

  return [
    ...offers.slice(0, index),
    offerItem,
    ...offers.slice(index + 1)
  ];
};
