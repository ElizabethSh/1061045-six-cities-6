import React from 'react';
import PropTypes from 'prop-types';
import {CardName} from '../../common/const';
import PlaceCard from '../place-card/place-card';
import {placePropTypes} from '../../common/place-prop-types';

const FavoriteLocations = (props) => {
  const {places, city} = props;
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {places.map((place) => {
          return (
            <PlaceCard key={place.id}
              place={place}
              cardName={CardName.FAVORITES}
            />
          );
        })}
      </div>
    </li>
  );
};

FavoriteLocations.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placePropTypes)
  ).isRequired,
  city: PropTypes.string.isRequired,
};

export default FavoriteLocations;
