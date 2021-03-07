import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import Favorites from '../favorites/favorites';
import Place from '../place/place';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../common/const';

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
