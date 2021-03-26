import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import PlaceCard from '../place-card/place-card';
import {placeProp} from '../../common/prop-types/place.prop';
import {CardName, CardsListName} from '../../common/const';
import {resetCardHover, setCardHover} from '../../store/reducer/card/action';

const PlacesList = (props) => {
  const {
    places, // приходит либо nearPlaces, либо activeCityPlaces
    placesListName,
  } = props;
  const dispatch = useDispatch();

  // определение типа карточки
  let cardName = CardName.CITIES;
  if (placesListName === CardsListName.NEAR_PLACES_LIST) {
    cardName = CardName.NEAR_PLACES;
  }

  const handleCardMouseEnter = (place) => {
    if (cardName === CardName.CITIES) {
      dispatch(setCardHover(place.id));
    }
  };

  const handleCardMouseLeave = () => {
    if (cardName === CardName.CITIES) {
      dispatch(resetCardHover());
    }
  };

  return (
    <div className={`${placesListName} places__list`}>
      {
        places.map((place) => {
          return (
            <PlaceCard
              key={place.id}
              place={place}
              cardName={cardName}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            />
          );
        })
      }
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
