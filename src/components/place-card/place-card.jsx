import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import {formatString, convertRatingToPersent} from '../../common/utils';
import {placeProp} from '../../common/prop-types/place.prop';
import {ButtonName, CardName} from '../../common/const';
import {connect} from 'react-redux';
import {resetPlaceInfo} from '../../store/reducer/place-info/place-info-action';
import {resetNearPlaces} from '../../store/reducer/near-places/near-places-action';

const CardSettings = {
  [CardName.FAVORITES]: {
    cardClass: `favorites__card`,
    imgSize: {
      width: 150,
      height: 110,
    },
    cardInfoClass: `favorites__card-info`,
    buttonName: ButtonName.FAVORITE
  },
  [CardName.CITIES]: {
    cardClass: `cities__place-card`,
    imgSize: {
      width: 260,
      height: 200,
    },
    cardInfoClass: ``,
    buttonName: ButtonName.PLACE_CARD,
  },
  [CardName.NEAR_PLACES]: {
    cardClass: `near-places__card`,
    imgSize: {
      width: 260,
      height: 200,
    },
    cardInfoClass: ``,
    buttonName: ButtonName.NEAR_PLACE,
  }
};

const PlaceCard = (props) => {
  const {
    place,
    cardName,
    onMouseEnter,
    onMouseLeave,
    resetPlace,
    resetNearPlaceList
  } = props;

  const {
    title,
    price,
    previewImage,
    type,
    isFavorite,
    isPremium,
    rating,
  } = place;

  const renderPremiumMark = () => {
    return (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    );
  };

  const handleTitleClick = () => {
    if (cardName === CardName.NEAR_PLACES) {
      resetPlace();
      resetNearPlaceList();
    }
  };

  return (
    <article
      onMouseEnter={() => {
        // если обработчик передан, то вызвать его при наведении
        // на карточку
        if (onMouseEnter) {
          onMouseEnter(place);
        }
      }}

      onMouseLeave={() => {
        // если обработчик передан, то вызвать его при перемещении
        // курсора с карточки
        if (onMouseLeave) {
          onMouseLeave();
        }
      }}

      className={
        `${CardSettings[cardName].cardClass} place-card`
      }
    >
      {
        isPremium && renderPremiumMark()
      }
      <div className={
        `${cardName}__image-wrapper place-card__image-wrapper`
      }>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={CardSettings[cardName].imgSize.width}
            height={CardSettings[cardName].imgSize.height}
            alt="Place image"
          />
        </a>
      </div>
      <div className={
        `${CardSettings[cardName].cardInfoClass} place-card__info`
      }>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isFavorite={isFavorite}
            buttonName={CardSettings[cardName].buttonName}
            placeId={place.id}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: convertRatingToPersent(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={handleTitleClick}>
          <Link to={`/offer/${place.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{formatString(type)}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape(placeProp),
  cardName: PropTypes.oneOf(
      [CardName.CITIES, CardName.FAVORITES, CardName.NEAR_PLACES]
  ).isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  resetPlace: PropTypes.func,
  resetNearPlaceList: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPlace: () => dispatch(resetPlaceInfo()),
    resetNearPlaceList: () => dispatch(resetNearPlaces())
  };
};

export default connect(null, mapDispatchToProps)(PlaceCard);
