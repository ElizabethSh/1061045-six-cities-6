import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PageHeader from '../page-header/page-header';
import FavoriteLocations from '../favorites-locations/favorites-locations';
import PageFooter from '../page-footer/page-footer';
import {placeProp} from '../../common/prop-types/place.prop';
import {getCityPlaces} from '../../common/utils';

const Favorites = (props) => {
  const {places} = props;

  // сортировка только по флагу isFavorite
  const favoritePlaces = places.filter((place) => place.isFavorite === true);

  // определение списка городов по которым нужно вывести избранные предложения
  const cities = [];
  favoritePlaces.forEach((place) => cities.push(place.city.name));
  const favoriteCities = Array.from(new Set(cities));

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

Favorites.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
};

const mapStateToProps = (state) => {
  return {
    places: state.reducer.offers
  };
};

export default connect(mapStateToProps)(Favorites);
