import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {formatString, convertRatingToPersent} from '../../common/utils';
import {placePropTypes} from '../../common/place-prop-types';
import {CardName} from '../../common/const';

const PlaceCard = (props) => {
  const {place, cardName, onMouseEnter} = props;
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

  return (
    <article
      onMouseEnter={() => onMouseEnter(place)}
      className={
        `${(cardName === CardName.FAVORITES)
          ? `favorites__card`
          : `cities__place-card`} place-card`
      }
    >

      {isPremium ? renderPremiumMark() : null}

      <div className={`${cardName}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={(cardName === CardName.FAVORITES) ? 150 : 260}
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div
        className={
          `${(cardName === CardName.FAVORITES)
            ? `favorites__card-info`
            : ``} place-card__info`
        }
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button${isFavorite ? `--active` : ``} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: convertRatingToPersent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{formatString(type)}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape(placePropTypes),
  cardName: PropTypes.oneOf([CardName.CITIES, CardName.FAVORITES]).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
};

export default PlaceCard;
