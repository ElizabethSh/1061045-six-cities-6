import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import {placeProp} from '../../common/prop-types/place.prop';
import {cityProp} from '../../common/prop-types/city.prop';
import {CardsListName} from '../../common/const';


const PlacesContainer = (props) => {
  const {activeCityPlaces, activeCity} = props;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {
            `${activeCityPlaces.length} ${(activeCityPlaces.length > 1) ? `places` : `place`} to stay in ${activeCity}`
          }
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex="0">Popular</li>
            <li className="places__option" tabIndex="0">Price: low to high</li>
            <li className="places__option" tabIndex="0">Price: high to low</li>
            <li className="places__option" tabIndex="0">Top rated first</li>
          </ul>
        </form>
        <PlacesList
          places={activeCityPlaces}
          placesListName={CardsListName.CITIES_PLACES_LIST}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            city={activeCity}
            places={activeCityPlaces}
          />
        </section>
      </div>
    </div>
  );
};

PlacesContainer.propTypes = {
  activeCity: cityProp,
  activeCityPlaces: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeCity: state.reducer.activeCity
  };
};

export default connect(mapStateToProps)(PlacesContainer);
