import {APIRoute} from "../common/const";
import {ActionCreator} from "./action";

const adaptData = (data) => {
  const adaptedData = ({
    ...data,
    isFavorite: data.is_favorite,
    isPremium: data.is_premium,
    previewImage: data.preview_image,
    maxAdults: data.max_adults,
    host: {
      ...data.host,
      avatarUrl: data.host.avatar_url,
      isPro: data.host.is_pro
    }
  });

  delete adaptedData.is_favorite;
  delete adaptedData.is_premium;
  delete adaptedData.preview_image;
  delete adaptedData.max_adults;
  delete adaptedData.host.avatar_url;
  delete adaptedData.host.is_pro;

  return adaptedData;
};

export const fetchOffersList = () => (dispatch, _getState, api) => {
  api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((it) => adaptData(it)))
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
