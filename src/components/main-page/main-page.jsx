import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {changeCity, resetCity, resetOffers} from '../../store/reducer/offers/action';
import PageHeader from '../page-header/page-header';
import CityList from '../city-list/city-list';
import PlacesContainer from '../places-container/places-container';
import EmptyPlacesContainer from '../empty-places-container/empty-places-container';
import Loader from '../loader/loader';
import {CITIES} from '../../common/const';
import {fetchOffersList} from '../../store/api-actions';
import {getActiveCityPlaces} from '../../store/reducer/offers/selectors';

const MainPage = () => {
  const activeCityPlaces = useSelector(
      (state) => getActiveCityPlaces(state)
  );
  const {isOffersLoaded} = useSelector((state) => state.OFFER);
  const dispatch = useDispatch();

  let {city} = useParams();

  useEffect(() => {
    if (!isOffersLoaded) {
      dispatch(fetchOffersList());
    }

    return () => dispatch(resetOffers());
  }, []);

  useEffect(() => {
    if (!city) {
      dispatch(resetCity());
      return;
    }

    dispatch(changeCity(city));
  }, [isOffersLoaded, city]);

  if (!isOffersLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page page--gray page--main">

      <PageHeader />

      <main className={
        `page__main page__main--index
        ${(!activeCityPlaces.length) && `page__main--index-empty`}`
      }>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <CityList cities={CITIES}/>

          </section>
        </div>
        <div className="cities">
          {
            (activeCityPlaces.length)
              ? <PlacesContainer/>
              : <EmptyPlacesContainer />
          }
        </div>
      </main>
    </div>
  );
};

export default MainPage;
