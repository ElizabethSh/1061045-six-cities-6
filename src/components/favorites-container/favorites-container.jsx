import React from 'react';
import FavoritesLocations from '../favorites-locations/favorites-locations';
import {getCitiesList, getCityPlaces} from '../../common/utils';
import {useSelector} from 'react-redux';

const FavoritesContainer = () => {
  const {favorites} = useSelector((state) => state.FAVORITE);
  const favoriteCities = getCitiesList(favorites);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          favoriteCities.map((city) => {
            const favoriteCityPlaces = getCityPlaces(favorites, city);

            return (
              <FavoritesLocations
                key={city}
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

export default FavoritesContainer;
