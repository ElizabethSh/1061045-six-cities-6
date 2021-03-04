import React from 'react';
import PropTypes from 'prop-types';
import FavoriteLocations from '../favorites-locations/favorites-locations';
import {getCityPlaces} from '../../common/utils';
import {placeProp} from '../../common/prop-types/place.prop';

const FavoritesContainer = (props) => {
  const {favoritePlaces} = props;

  // определение списка городов по которым нужно вывести избранные предложения
  const cities = [];
  favoritePlaces.forEach((place) => cities.push(place.city.name));
  const favoriteCities = Array.from(new Set(cities));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          favoriteCities.map((city, index) => {
            // фильтрация избранных размещений по городу
            const favoriteCityPlaces = getCityPlaces(favoritePlaces, city);

            return (
              <FavoriteLocations
                key={city + index}
                places={favoriteCityPlaces}
                city={city}
              />
            );
          })
        }
      </ul>
    </section>
  );
};

FavoritesContainer.propTypes = {
  favoritePlaces: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
};

export default FavoritesContainer;
