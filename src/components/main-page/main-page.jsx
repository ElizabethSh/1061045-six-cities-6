import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import PageHeader from '../page-header/page-header';
import CityList from '../city-list/city-list';
import PlacesContainer from '../places-container/places-container';
import EmptyPlacesContainer from '../empty-places-container/empty-places-container';
import {placeProp} from '../../common/prop-types/place.prop';
import {cityProp} from '../../common/prop-types/city.prop';
import {CITIES} from '../../common/const';
import {getCityPlaces} from '../../common/utils';

const MainPage = (props) => {
  const {places, activeCity, changeActiveCity, cityReset} = props;
  let {city} = useParams(); // определяем по адресной строке выбранный город

  useEffect(() => {
    if (!city) {
      cityReset();
      return;
    }

    changeActiveCity(city);
  }, [city]);


  // сортировка по выбранному городу
  const activeCityPlaces = getCityPlaces(places, activeCity);

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
              ? <PlacesContainer
                activeCityPlaces={activeCityPlaces}
              />
              : <EmptyPlacesContainer />
          }
        </div>
      </main>
    </div>
  );
};

MainPage.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
  activeCity: cityProp,
  changeActiveCity: PropTypes.func.isRequired,
  cityReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeCity: state.reducer.activeCity,
    places: state.reducer.offers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeActiveCity: (city) => dispatch(ActionCreator.cityChangeAction(city)),
    cityReset: () => dispatch(ActionCreator.cityResetAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
