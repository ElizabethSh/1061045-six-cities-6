import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {AppRoute} from '../../common/const';

const PrivateRoute = (props) => {
  const {path, exact, isLoggedIn, render} = props;

  return (
    <Route
      path={path}
      exact={exact}
    >
      {isLoggedIn ? render() : <Redirect to={AppRoute.LOGIN} />}
    </Route>
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = ({USER}) => {
  return {
    isLoggedIn: USER.isLoggedIn
  };
};

export default connect(mapStateToProps)(PrivateRoute);
