import PropTypes from 'prop-types';

export const placePropTypes = {
  id: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
    name: PropTypes.string.isRequired,
  }),
  description: PropTypes.string.isRequired,
  goods: PropTypes.array,
  host: PropTypes.shape({
    id: PropTypes.number,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool,
    name: PropTypes.string,
  }),
  images: PropTypes.array,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }),
  maxAdults: PropTypes.number,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
