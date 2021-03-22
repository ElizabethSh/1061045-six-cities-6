import {APIRoute} from "../common/const";
import {adaptOffersData, adaptReviewsData} from "../services/adapter";
import {loadReviews} from "./reducer/reviews/reviews-action";
import {checkAuthAttempt, setAuthStatus, setUsersEmail} from "./reducer/user/user-action";
import {changeErrorStatus, loadOffers} from "./reducer/offers/offers-action";
import {loadPlaceInfo} from "./reducer/place-info/place-info-action";
import {loadFavorites} from "./reducer/favorites/favorites-action";
import {loadNearPlaces} from "./reducer/near-places/near-places-action";

export const fetchOffersList = () => (dispatch, _getState, api) => {
  api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((it) => adaptOffersData(it)))
    .then((data) => dispatch(loadOffers(data)))
    .catch(() => dispatch(changeErrorStatus(true)));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(({data}) => dispatch(setUsersEmail(data.email)))
    .then(() => dispatch(setAuthStatus(true)))
    .then(() => dispatch(checkAuthAttempt()))
    .catch(() => dispatch(checkAuthAttempt()));
};

export const logIn = ({email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(setAuthStatus(true)))
    .then(() => dispatch(setUsersEmail(email)))
    .catch(() => dispatch(changeErrorStatus(true)));
};

export const logOut = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(setAuthStatus(false)))
    .then(() => dispatch(setUsersEmail(null)))
    .catch(() => dispatch(changeErrorStatus(true)));
};

export const addToFavorite = (id, status) => (dispatch, _getState, api) => {
  return api.post(`/favorite/${id}/${status}`)
    .then(({data}) => adaptOffersData(data))
    .catch((error) => {
      dispatch(changeErrorStatus(true));
      throw error;
    });
};

export const fetchPlace = (id) => (dispatch, _getState, api) => {
  return api.get(`hotels/${id}`)
    .then(({data}) => adaptOffersData(data))
    .then((data) => dispatch(loadPlaceInfo(data)))
    .catch(() => dispatch(changeErrorStatus(true)));
};

export const fetchNearPlaces = (id) => (dispatch, _getState, api) => {
  return api.get(`/hotels/${id}/nearby`)
    .then(({data}) => data.map((it) => adaptOffersData(it)))
    .then((data) => dispatch(loadNearPlaces(data)))
    .catch(() => dispatch(changeErrorStatus(true)));
};

export const fetchFavoritePlaces = () => (dispatch, _getState, api) => {
  return api.get(`/favorite`)
    .then(({data}) => data.map((it) => adaptOffersData(it)))
    .then((data) => dispatch(loadFavorites(data)))
    .catch(() => dispatch(changeErrorStatus(true)));
};

export const fetchPlaceReviews = (placeId) => (dispatch, _getState, api) => {
  api.get(`comments/${placeId}`)
    .then(({data}) => data.map((it) => adaptReviewsData(it)))
    .then((data) => dispatch(loadReviews(data)))
    .catch(() => dispatch(changeErrorStatus(true)));
};

export const sendPlaceReview = (id, {rating, comment}) => (dispatch, _getState, api) => {
  return api.post(`comments/${id}`, {rating, comment})
    .then(({data}) => data.map((it) => adaptReviewsData(it)))
    .then((data) => dispatch(loadReviews(data)))
    .catch(() => dispatch(changeErrorStatus(true)));
};
