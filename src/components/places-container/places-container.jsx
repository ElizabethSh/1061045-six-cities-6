import React from 'react';
import {useSelector} from 'react-redux';
import Sort from '../sort/sort';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import {CardsListName} from '../../common/const';
import {getSortedPlaces} from '../../store/reducer/sort/selectors';
import {getActiveCityPlaces} from '../../store/reducer/offers/selectors';


const PlacesContainer = () => {
  const sortedPlaces = useSelector(
      (state) => getSortedPlaces(state)
  );
  const activeCityPlaces = useSelector(
      (state) => getActiveCityPlaces(state)
  );
  const {activeCity} = useSelector((state) => state.OFFER);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {
            `${activeCityPlaces.length}
              ${(activeCityPlaces.length > 1) ? `places` : `place`}
            to stay in ${activeCity}`
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

export default PlacesContainer;
