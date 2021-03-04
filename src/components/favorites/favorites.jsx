import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PageHeader from '../page-header/page-header';
import PageFooter from '../page-footer/page-footer';
import EmptyFavoritesContainer from '../empty-favorites-container/empty-favorites-container';
import FavoritesContainer from '../favorites-container/favorites-container';
import {placeProp} from '../../common/prop-types/place.prop';

const Favorites = (props) => {
  const {places} = props;

  // сортировка только по флагу isFavorite
  const favoritePlaces = places.filter(
      (place) => place.isFavorite === true
  );

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favoritePlaces.length
              ? <FavoritesContainer
                favoritePlaces={favoritePlaces}
              />
              : <EmptyFavoritesContainer />
          }
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

Favorites.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
};

const mapStateToProps = (state) => {
  return {
    places: state.reducer.offers
  };
};

export default connect(mapStateToProps)(Favorites);
