import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header';
import PageFooter from '../page-footer/page-footer';
import EmptyFavoritesContainer from '../empty-favorites-container/empty-favorites-container';
import FavoritesContainer from '../favorites-container/favorites-container';
import Loader from '../loader/loader';
import {fetchFavoritePlaces} from '../../store/api-actions';
import {connect} from 'react-redux';
import {placeProp} from '../../common/prop-types/place.prop';
import {resetFavorites} from '../../store/reducer/favorites/favorites-action';
import {getFavoritePlaces, getIsFavoritesLoaded} from '../../store/reducer/favorites/selectors';

const Favorites = (props) => {
  const {
    loadFavorites,
    favoritePlaces,
    isFavoritesLoaded,
    resetIsFavoritesLoaded
  } = props;

  useEffect(() => {
    if (!isFavoritesLoaded) {
      loadFavorites();
    }

    return () => resetIsFavoritesLoaded();
  }, []);

  if (!isFavoritesLoaded) {
    return <Loader />;
  }

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
  loadFavorites: PropTypes.func.isRequired,
  isFavoritesLoaded: PropTypes.bool,
  favoritePlaces: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ),
  resetIsFavoritesLoaded: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    favoritePlaces: getFavoritePlaces(state),
    isFavoritesLoaded: getIsFavoritesLoaded(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFavorites: () => dispatch(fetchFavoritePlaces()),
    resetIsFavoritesLoaded: () => dispatch(resetFavorites())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
