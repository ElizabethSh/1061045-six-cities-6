import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import PageHeader from '../page-header/page-header';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import Loader from '../loader/loader';
import PlaceReview from '../place-review/place-review';
import {convertRatingToPersent, formatString} from '../../common/utils';
import {AppRoute, CardsListName} from '../../common/const';
import {fetchNearPlaces, fetchPlace} from '../../store/api-actions';

const MAX_IMAGES_AMOUNT = 6;

const Place = () => {
  const [isPlaceInfoLoaded, setPlaceInfoLoaded] = useState(false);
  const [placeInfo, setPlaceInfo] = useState([]);
  const [nearPlaces, setNearPlaces] = useState([]);
  const [isNearPlacesLoaded, setNearPlacesLoaded] = useState(false);
  const history = useHistory();
  let {id} = useParams();

  useEffect(() => {
    if (!isPlaceInfoLoaded) {
      fetchPlace(id)
        .then((data) => setPlaceInfo(data))
        .then(() => setPlaceInfoLoaded(true))
        .catch(() => history.push(AppRoute.ERROR));
    }
  }, [isPlaceInfoLoaded]);

  useEffect(() => {
    if (!isNearPlacesLoaded) {
      fetchNearPlaces(id)
        .then((data) => setNearPlaces(data))
        .then(() => setNearPlacesLoaded(true));
    }
  }, [isNearPlacesLoaded]);

  if (!(isPlaceInfoLoaded && isNearPlacesLoaded)) {
    return (
      <Loader />
    );
  }

  // определяем город открытого (выбранного) объекта размещения,
  // для которого нужно отобразить карту с объектами неподалеку
  const city = placeInfo.city.name;

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
  } = placeInfo;

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
              {
                images.slice(0, MAX_IMAGES_AMOUNT).map((image, index) => {
                  return (
                    <div className="property__image-wrapper" key={`${image}-${index}`}>
                      <img className="property__image" src={image} alt={`Photo ${title}`} />
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium && renderPremiumMark()
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={
                    `property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`
                  }
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
                <li className="property__feature property__feature--entire">
                  {formatString(type)}
                </li>
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
                  {
                    goods.map((good, index) => {
                      return (
                        <li key={`${good}-${index}`}
                          className="property__inside-item"
                        >
                          {good}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={
                    `property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper}`
                  }>
                    <img className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <PlaceReview placeId={id} />
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={city}
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

export default Place;
