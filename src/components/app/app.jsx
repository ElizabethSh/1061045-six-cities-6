import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../main-page/main-page";
import AuthPage from "../auth-page/auth-page";
import Favorites from "../favorites/favorites";
import Place from "../place/place";
import NotFoundPage from "../not-found-page/not-found-page";
import PrivateRoute from "../private-route/private-route";
import Loader from "../loader/loader";
import Popup from "../popup/popup";
import { AppRoute } from "../../common/const";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/api-actions";

const App = () => {
  const { isError } = useSelector((state) => state.OFFER);
  const { isAuthChecked } = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  if (!isAuthChecked) {
    dispatch(checkAuth());
  }

  if (!isAuthChecked) {
    return <Loader />;
  }

  return (
    <>
      {isError && <Popup />}
      <Routes>
        <Route path={AppRoute.ROOT} element={<MainPage />} />
        <Route path={AppRoute.LOGIN} element={<AuthPage />} />
        <Route
          path={AppRoute.FAVORITES}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.CITY} element={<MainPage />} />
        <Route path={AppRoute.OFFER} element={<Place />} />
        <Route path={AppRoute.ERROR} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
