import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppRoute } from "../../common/const";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.USER);

  return isLoggedIn ? children : <Navigate to={AppRoute.LOGIN} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
