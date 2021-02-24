import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Sort from '../sort/sort';
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
        <Sort />
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
    activeCity: state.reducer.activeCity,
    activeCityPlaces: state.reducer.activeCityPlaces
  };
};

export default connect(mapStateToProps)(PlacesContainer);
