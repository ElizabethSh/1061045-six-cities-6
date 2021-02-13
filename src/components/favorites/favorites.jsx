import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header';
import {placePropTypes} from '../../common/place-prop-types';
import FavoriteLocations from '../favorites-locations/favorites-locations';

const Favorites = (props) => {
  const [activePlaceId, setActivePlace] = useState(0); // ВРЕМЕННО! Из-за задания 4!

  const {places} = props; // придут только избранные размещения!

  // ПОВТОР обработчика из PlaceList!!! Из-за задания 4!
  const handleCardMouseEnter = (place) => {
    setActivePlace(place.id);
  };

  // определение списка городов по которым нужно вывести избранные предложения
  const cities = [];
  places.forEach((place) => cities.push(place.city.name));
  const favoriteCities = Array.from(new Set(cities));

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <div>{activePlaceId}</div> {/* ВРЕМЕННО!!!, чтобы линтер не ругался на неиспользование activePlace*/}

            <ul className="favorites__list">
              {favoriteCities.map((city, index) => {

                // фильтрация избранных размещений по городу
                const favoritePlaces = places.filter((place) => place.city.name === city);

                return (
                  <FavoriteLocations
                    key={city + index}
                    places={favoritePlaces}
                    city={city}
                    onMouseEnter={handleCardMouseEnter}
                  />
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placePropTypes)
  ).isRequired,
};

export default Favorites;
