import {APIRoute} from "../common/const";
import {adaptOffersData, adaptReviewsData} from "../services/adapter";
import {loadReviews} from "./reducer/reviews/action";
import {checkAuthAttempt, setAuthStatus, setUsersEmail} from "./reducer/user/action";
import {changeErrorStatus, loadOffers} from "./reducer/offers/action";
import {loadPlaceInfo} from "./reducer/place-info/action";
import {loadFavorites} from "./reducer/favorites/action";
import {loadNearPlaces} from "./reducer/near-places/action";

export const fetchOffersList = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((it) => adaptOffersData(it)))
    .then((data) => dispatch(loadOffers(data)))
    .catch(() => dispatch(changeErrorStatus({isError: true, code: null})));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGIN)
    .then(({data}) => dispatch(setUsersEmail(data.email)))
    .then(() => dispatch(setAuthStatus(true)))
    .then(() => dispatch(checkAuthAttempt()))
    .catch(() => dispatch(checkAuthAttempt()));
};

export const logIn = ({email, password}) => (dispatch, _getState, api) => {
  return api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(setAuthStatus(true)))
    .then(() => dispatch(setUsersEmail(email)))
    .catch((error) => dispatch(changeErrorStatus({
      isError: true,
      code: error.response.status
    })));
};

export const logOut = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGOUT)
    .then(() => dispatch(setAuthStatus(false)))
    .then(() => dispatch(setUsersEmail(null)))
    .catch(() => dispatch(changeErrorStatus({isError: true, code: null})));
};

export const fetchPlace = (id) => (dispatch, _getState, api) => {
  return api.get(`${APIRoute.HOTELS}/${id}`)
    .then(({data}) => adaptOffersData(data))
    .then((data) => dispatch(loadPlaceInfo(data)))
    .catch(() => dispatch(changeErrorStatus({isError: true, code: null})));
};

export const fetchNearPlaces = (id) => (dispatch, _getState, api) => {
  return api.get(`${APIRoute.HOTELS}/${id}/nearby`)
    .then(({data}) => data.map((it) => adaptOffersData(it)))
    .then((data) => dispatch(loadNearPlaces(data)))
    .catch(() => dispatch(changeErrorStatus({isError: true, code: null})));
};

export const fetchFavoritePlaces = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.FAVORITE)
    .then(({data}) => data.map((it) => adaptOffersData(it)))
    .then((data) => dispatch(loadFavorites(data)))
    .catch(() => dispatch(changeErrorStatus({isError: true, code: null})));
};

export const addToFavorite = (id, status) => (dispatch, _getState, api) => {
  return api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => adaptOffersData(data))
    .catch((error) => {
      dispatch(changeErrorStatus({isError: true, code: null}));
      throw error;
    });
};

export const fetchPlaceReviews = (id) => (dispatch, _getState, api) => {
  return api.get(`${APIRoute.COMMENTS}/${id}`)
    .then(({data}) => data.map((it) => adaptReviewsData(it)))
    .then((data) => dispatch(loadReviews(data)))
    .catch(() => dispatch(changeErrorStatus({isError: true, code: null})));
};

export const sendPlaceReview = (id, {rating, comment}) => (dispatch, _getState, api) => {
  return api.post(`${APIRoute.COMMENTS}/${id}`, {rating, comment})
    .then(({data}) => data.map((it) => adaptReviewsData(it)))
    .then((data) => dispatch(loadReviews(data)))
    .catch(() => dispatch(changeErrorStatus({isError: true, code: null})));
};
