import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import Favorites from '../favorites/favorites';
import Place from '../place/place';
import NotFoundPage from '../not-found-page/not-found-page';
import {reviewProp} from '../../common/prop-types/review.prop';

const App = (props) => {
  const {reviews} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage/>
        </Route>
        <Route path="/login" exact>
          <AuthPage/>
        </Route>
        <Route path="/favorites" exact>
          <Favorites/>
        </Route>

        <Route path="/city/:city" >
          <MainPage/>
        </Route>

        <Route path="/offer/:id">
          <Place
            reviews={reviews}
          />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
};

export default App;
