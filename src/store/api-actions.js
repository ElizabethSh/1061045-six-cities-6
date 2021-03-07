import {APIRoute} from "../common/const";
import {adaptOffersData} from "../services/adapter";
import {ActionCreator} from "./action";

export const fetchOffersList = () => (dispatch, _getState, api) => {
  api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((it) => adaptOffersData(it)))
    .then((data) => dispatch(ActionCreator.loadDataAction(data)));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(({data}) => dispatch(ActionCreator.setUsersEmailAction(data.email)))
    .then(() => dispatch(ActionCreator.setAuthStatusAction(true)))
    .catch(() => {});
};

export const logIn = ({email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(ActionCreator.setAuthStatusAction(true)))
    .then(() => dispatch(ActionCreator.setUsersEmailAction(email)))
    .catch(() => {});
};

export const logOut = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(ActionCreator.setAuthStatusAction(false)))
    .then(() => dispatch(ActionCreator.setUsersEmailAction(null)))
    .catch(() => {});
};
