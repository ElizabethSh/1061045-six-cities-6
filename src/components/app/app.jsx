import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthPage from '../auth-page/auth-page';
import Favorites from '../favorites/favorites';
import Place from '../place/place';
import NotFoundPage from '../not-found-page/not-found-page';

const App = (props) => {
  const {places} = props;
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
          <Favorites />
        </Route>
        <Route path="/offer/:id" exact>
          <Place />
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
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photo: PropTypes.string.isRequired,
      })
  ).isRequired
};

export default App;
