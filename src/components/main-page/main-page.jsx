import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeCity, resetCity} from '../../store/reducer/offers/offers-action';
import PageHeader from '../page-header/page-header';
import CityList from '../city-list/city-list';
import PlacesContainer from '../places-container/places-container';
import EmptyPlacesContainer from '../empty-places-container/empty-places-container';
import Loader from '../loader/loader';
import {placeProp} from '../../common/prop-types/place.prop';
import {CITIES} from '../../common/const';
import {fetchOffersList} from '../../store/api-actions';
import {getActiveCityPlaces, getIsOffersLoaded} from '../../store/reducer/offers/selectors';

const MainPage = (props) => {
  const {
    activeCityPlaces,
    isOffersLoaded,
    changeActiveCity,
    cityReset,
    onOffersLoad
  } = props;

  let {city} = useParams(); // определяем по адресной строке выбранный город

  useEffect(() => {
    if (!isOffersLoaded) {
      onOffersLoad();
    }
  }, [isOffersLoaded]);

  useEffect(() => {
    if (!city) {
      cityReset(); // устанавливаем город по умолчанию
      return;
    }

    changeActiveCity(city); // устанавливаем выбранный город
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

            <CityList
              cities={CITIES}
            />

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

MainPage.propTypes = {
  changeActiveCity: PropTypes.func.isRequired,
  cityReset: PropTypes.func.isRequired,
  activeCityPlaces: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
  onOffersLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeCityPlaces: getActiveCityPlaces(state),
    isOffersLoaded: getIsOffersLoaded(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeActiveCity: (city) => dispatch(changeCity(city)),
    cityReset: () => dispatch(resetCity()),
    onOffersLoad: () => dispatch(fetchOffersList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
