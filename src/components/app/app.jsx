import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthPage from '../auth-page/auth-page';
import Favorites from '../favorites/favorites';
import Place from '../place/place';
import NotFoundPage from '../not-found-page/not-found-page';
import {placePropTypes} from '../../common/place-prop-types';

const App = (props) => {
  const {places} = props;

  // сортировка только по флагу isFavorite
  const favoritePlaces = places.filter((place) => place.isFavorite === true);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage places = {places}/>
        </Route>
        <Route path="/login" exact>
          <AuthPage/>
        </Route>
        <Route path="/favorites" exact>
          <Favorites places = {favoritePlaces}/>
        </Route>
        <Route path="/offer/:id">
          <Place places={places}/>
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placePropTypes)
  ).isRequired,
};

export default App;
