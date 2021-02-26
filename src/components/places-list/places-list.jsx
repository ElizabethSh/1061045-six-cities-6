import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PlaceCard from '../place-card/place-card';
import {placeProp} from '../../common/prop-types/place.prop';
import {CardName, CardsListName} from '../../common/const';
import {ActionCreator} from '../../store/action';

const PlacesList = (props) => {
  const {
    places, // приходит либо nearPlaces, либо activeCityPlaces
    placesListName,
    setActiveCard,
    resetActiveCard,
  } = props;

  // определение типа карточки
  let cardName = CardName.CITIES;
  if (placesListName === CardsListName.NEAR_PLACES_LIST) {
    cardName = CardName.NEAR_PLACES;
  }

  // возможно нужно оптимизировать условие?
  // возможно обработчик нужно перенести в PlaceCard?
  const handleCardMouseEnter = (place) => {
    if (cardName === CardName.CITIES) {
      setActiveCard(place.id);
    }
  };

  // возможно обработчик нужно перенести в PlaceCard?
  const handleCardMouseLeave = () => {
    resetActiveCard();
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
  setActiveCard: PropTypes.func,
  resetActiveCard: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCard: (cardId) => dispatch(ActionCreator.cardHoverAction(cardId)),
    resetActiveCard: () => dispatch(ActionCreator.resetCardHoverAction()),
  };
};

export default connect(null, mapDispatchToProps)(PlacesList);
