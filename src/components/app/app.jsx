import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import Favorites from '../favorites/favorites';
import Place from '../place/place';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import Popup from '../popup/popup';
import {AppRoute} from '../../common/const';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuth} from '../../store/api-actions';

const App = () => {
  const {isError} = useSelector((state) => state.OFFER);
  const {isAuthChecked} = useSelector((state) => state.USER);
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
      <Switch>
        <Route path={AppRoute.ROOT} exact>
          <MainPage/>
        </Route>
        <Route path={AppRoute.LOGIN} exact>
          <AuthPage/>
        </Route>

        <PrivateRoute
          path={AppRoute.FAVORITES}
          exact
          render={() => <Favorites/>}
        />

        <Route path={AppRoute.CITY} >
          <MainPage/>
        </Route>

        <Route path={AppRoute.OFFER}>
          <Place/>
        </Route>
        <Route path={AppRoute.ERROR}>
          <NotFoundPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
