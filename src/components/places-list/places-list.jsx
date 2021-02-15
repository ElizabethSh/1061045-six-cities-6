import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {placePropTypes} from '../../common/place-prop-types';

const PlacesList = (props) => {
  const [activePlaceId, setActivePlace] = useState(0);
  const {places} = props;

  const handleCardMouseEnter = (place) => {
    setActivePlace(place.id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      <div>{activePlaceId}</div> {/* ВРЕМЕННО!!!, чтобы линтер не ругался на неиспользование activePlace*/}
      {places.map((place) => {
        return (
          <PlaceCard
            key={place.id}
            place={place}
            cardName={`cities`}
            onMouseEnter={handleCardMouseEnter}
          />
        );
      })}
    </div>
  );
};

PlacesList.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placePropTypes)
  ).isRequired,
};

export default PlacesList;
