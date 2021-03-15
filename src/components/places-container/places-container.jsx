import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Sort from '../sort/sort';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import {placeProp} from '../../common/prop-types/place.prop';
import {cityProp} from '../../common/prop-types/city.prop';
import {sortTypeProp} from '../../common/prop-types/sort-type.prop';
import {CardsListName} from '../../common/const';
import {sortPlacesList} from '../../store/reducer/sort/sort-action';


const PlacesContainer = (props) => {
  const {
    activeCityPlaces,
    activeCity,
    sortType,
    getPlacesList,
    sortedPlaces
  } = props;

  useEffect(() => {
    getPlacesList(activeCityPlaces, sortType);
  }, [sortType, activeCity]);

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
          places={sortedPlaces}
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
  sortType: sortTypeProp,
  getPlacesList: PropTypes.func,
  sortedPlaces: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
};

const mapStateToProps = ({SORT, OFFER}) => {
  return {
    activeCity: OFFER.activeCity,
    activeCityPlaces: OFFER.activeCityPlaces,
    sortType: SORT.sortType,
    sortedPlaces: SORT.sortedPlaces,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlacesList: (places, sortType) => dispatch(sortPlacesList(places, sortType))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesContainer);
