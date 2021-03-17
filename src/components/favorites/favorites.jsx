import React, {useEffect, useState} from 'react';
import PageHeader from '../page-header/page-header';
import PageFooter from '../page-footer/page-footer';
import EmptyFavoritesContainer from '../empty-favorites-container/empty-favorites-container';
import FavoritesContainer from '../favorites-container/favorites-container';
import Loader from '../loader/loader';
import {fetchFavoritePlaces} from '../../store/api-actions';

const Favorites = () => {
  const [favoritePlaces, setFavoritesPlaces] = useState([]);
  const [isFavoritesLoading, setIsFavoretesLoading] = useState(true);

  useEffect(() => {
    if (isFavoritesLoading) {
      fetchFavoritePlaces()
        .then((data) => setFavoritesPlaces(data))
        .then(() => setIsFavoretesLoading(false))
        .catch(() => setIsFavoretesLoading(false));
    }
  }, [isFavoritesLoading]);

  if (isFavoritesLoading) {
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

export default Favorites;
