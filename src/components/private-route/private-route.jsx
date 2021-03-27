import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {AppRoute} from '../../common/const';

const PrivateRoute = (props) => {
  const {path, exact, render} = props;
  const {isLoggedIn} = useSelector((state) => state.USER);

  return (
    <Route
      path={path}
      exact={exact}
    >
      {
        isLoggedIn
          ? render()
          : <Redirect to={AppRoute.LOGIN} />
      }
    </Route>
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
