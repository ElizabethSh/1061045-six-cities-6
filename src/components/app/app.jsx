import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import Favorites from '../favorites/favorites';
import Place from '../place/place';
import Loader from '../loader/loader';
import NotFoundPage from '../not-found-page/not-found-page';
import {reviewProp} from '../../common/prop-types/review.prop';
import {fetchOffersList} from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../common/const';

const App = (props) => {
  const {reviews, isDataLoaded, onDataLoad} = props;

  useEffect(() => {
    if (!isDataLoaded) {
      onDataLoad();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <Loader />
    );
  }

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

const mapStateToProps = (state) => {
  return {
    isDataLoaded: state.reducer.isDataLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDataLoad: () => dispatch(fetchOffersList()),
  };
};

App.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onDataLoad: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
