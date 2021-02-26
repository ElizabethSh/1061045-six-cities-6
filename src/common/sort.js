export const sortOffersByRating = (places) => {
  places.sort((place1, place2) => {
    return place2.rating - place1.rating;
  });
};

export const sortOffersLowToHightPrice = (places) => {
  places.sort((place1, place2) => {
    return place1.price - place2.price;
  });
};

export const sortOffersHightToLowPrice = (places) => {
  places.sort((place1, place2) => {
    return place2.price - place1.price;
  });
};
