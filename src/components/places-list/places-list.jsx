import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {placeProp} from '../../common/prop-types/place.prop';
import {CardName, CardsListName} from '../../common/const';

const PlacesList = (props) => {
  const {places, placesListName} = props;
  const [activePlaceId, setActivePlace] = useState(0);

  // определение типа карточки
  let cardName = CardName.CITIES;
  if (placesListName === CardsListName.NEAR_PLACES_LIST) {
    cardName = CardName.NEAR_PLACES;
  }

  const handleCardMouseEnter = (place) => {
    setActivePlace(place.id);
  };

  return (
    <div className={`${placesListName} places__list`}>
      <div>{activePlaceId}</div> {/* ВРЕМЕННО!!!, чтобы линтер не ругался на неиспользование activePlace*/}
      {places.map((place) => {
        return (
          <PlaceCard
            key={place.id}
            place={place}
            cardName={cardName}
            onMouseEnter={handleCardMouseEnter}
          />
        );
      })}
    </div>
  );
};

PlacesList.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
  placesListName: PropTypes.string.isRequired,
};

export default PlacesList;
