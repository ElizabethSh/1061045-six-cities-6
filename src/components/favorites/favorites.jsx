import React, { useEffect } from "react";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";
import EmptyFavoritesContainer from "../empty-favorites-container/empty-favorites-container";
import FavoritesContainer from "../favorites-container/favorites-container";
import Loader from "../loader/loader";
import { fetchFavoritePlacesAction } from "../../store/api-actions";
import { useDispatch, useSelector } from "react-redux";
import { resetFavorites } from "../../store/reducer/favorites/action";

const Favorites = () => {
  const { favorites, isFavoritesLoaded } = useSelector(
    (state) => state.FAVORITE
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavoritePlacesAction());
    }
    return () => dispatch(resetFavorites());
  }, []);

  if (!isFavoritesLoaded) {
    return <Loader />;
  }

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length ? (
            <FavoritesContainer />
          ) : (
            <EmptyFavoritesContainer />
          )}
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

export default Favorites;
