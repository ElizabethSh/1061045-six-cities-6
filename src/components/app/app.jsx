import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import Favorites from '../favorites/favorites';
import Place from '../place/place';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import Popup from '../popup/popup';
import {AppRoute} from '../../common/const';
import {connect} from 'react-redux';
import {checkAuth} from '../../store/api-actions';
import {getIsAuthChecked} from '../../store/reducer/user/selectors';
import {getIsErrorStatus} from '../../store/reducer/offers/selectors';

const App = (props) => {
  const {isAuthChecked, chechAuthorization, isError} = props;

  if (!isAuthChecked) {
    chechAuthorization();
  }

  if (!isAuthChecked) {
    return <Loader />;
  }

  return (
    <>
      {isError && <Popup />}
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
    </>
  );
};

App.propTypes = {
  isAuthChecked: PropTypes.bool.isRequired,
  chechAuthorization: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthChecked: getIsAuthChecked(state),
    isError: getIsErrorStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chechAuthorization: () => dispatch(checkAuth())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
