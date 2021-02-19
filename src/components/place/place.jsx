import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import ReviewForm from '../review-form/review-form';
import PageHeader from '../page-header/page-header';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import ReviewList from '../review-list/review-list';
import {placeProp} from '../../common/prop-types/place.prop';
import {convertRatingToPersent, formatString} from '../../common/utils';
import {reviewProp} from '../../common/prop-types/review.prop';
import {CardsListName} from '../../common/const';

const MAX_IMAGES_AMOUNT = 6;

const Place = (props) => {
  let {id} = useParams();
  const {places, reviews} = props;

  // находим объект размещения, у которого id совпадает с id
  // в адресной строке
  const offer = places.find((place) => place.id === Number(id));

  // фильтрация отзывов, относящихся к этому месту размещения
  const offerReviews = reviews.filter((review) => review.offerId === Number(id));

  // фильтрация объектов размещения, расположенных неподалеку
  const nearPlaces = places.filter((place) => place.id !== Number(id));

  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = offer;

  const renderPremiumMark = () => {
    return (
      <div className="property__mark">
        <span>Premium</span>
      </div>
    );
  };

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {images.slice(0, MAX_IMAGES_AMOUNT).map((image, index) => {
                return (
                  <div className="property__image-wrapper" key={`${image}-${index}`}>
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                );
              })}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {isPremium && renderPremiumMark()}

              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={`property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: convertRatingToPersent(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{formatString(type)}</li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, index) => {
                    return (
                      <li key={`${good}-${index}`} className="property__inside-item">
                        {good}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper}`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">{offerReviews.length}</span>
                </h2>
                {
                  (offerReviews.length > 0)
                    && <ReviewList reviews={offerReviews} />
                }
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              places={nearPlaces}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              places={nearPlaces}
              placesListName={CardsListName.NEAR_PLACES_LIST}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

Place.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
};

export default Place;
