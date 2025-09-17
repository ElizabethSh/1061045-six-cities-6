import { APIRoute } from "../common/const";
import { addReview, loadReviews } from "./reducer/reviews/action";
import {
  checkAuthAttempt,
  setAuthStatus,
  setUsersEmail,
} from "./reducer/user/action";
import { changeErrorStatus, loadOffers } from "./reducer/offers/action";
import { loadPlaceInfo } from "./reducer/place-info/action";
import { loadFavorites } from "./reducer/favorites/action";
import { loadNearPlaces } from "./reducer/near-places/action";
import { dropToken, setToken } from "../services/token";

export const fetchOffersListAction = () => (dispatch, _getState, api) => {
  return api
    .get(APIRoute.OFFERS)
    .then(({ data }) => dispatch(loadOffers(data)))
    .catch(() => dispatch(changeErrorStatus({ isError: true, code: null })));
};

export const fetchPlaceAction = (id) => (dispatch, _getState, api) => {
  return api
    .get(`${APIRoute.OFFERS}/${id}`)
    .then(({ data }) => dispatch(loadPlaceInfo(data)))
    .catch(() => dispatch(changeErrorStatus({ isError: true, code: null })));
};

export const fetchNearPlacesAction = (id) => (dispatch, _getState, api) => {
  return api
    .get(`${APIRoute.OFFERS}/${id}/nearby`)
    .then(({ data }) => dispatch(loadNearPlaces(data)))
    .catch(() => dispatch(changeErrorStatus({ isError: true, code: null })));
};

export const fetchPlaceReviewsAction = (id) => (dispatch, _getState, api) => {
  return api
    .get(`${APIRoute.COMMENTS}/${id}`)
    .then(({ data }) => dispatch(loadReviews(data)))
    .catch(() => dispatch(changeErrorStatus({ isError: true, code: null })));
};

export const logInAction =
  ({ email, password }) =>
  (dispatch, _getState, api) => {
    return api
      .post(APIRoute.LOGIN, { email, password })
      .then((response) => setToken(response.data.token))
      .then(() => dispatch(setAuthStatus(true)))
      .then(() => dispatch(setUsersEmail(email)))
      .catch((error) =>
        dispatch(
          changeErrorStatus({
            isError: true,
            code: error.response.status,
          })
        )
      );
  };

export const checkAuthAction = () => (dispatch, _getState, api) => {
  return api
    .get(APIRoute.LOGIN)
    .then(({ data }) => dispatch(setUsersEmail(data.email)))
    .then(() => dispatch(setAuthStatus(true)))
    .then(() => dispatch(checkAuthAttempt()))
    .catch(() => dispatch(checkAuthAttempt()));
};

export const logOutAction = () => (dispatch, _getState, api) => {
  return api
    .get(APIRoute.LOGOUT)
    .then(() => dropToken())
    .then(() => dispatch(setAuthStatus(false)))
    .then(() => dispatch(setUsersEmail(null)))
    .catch(() => dispatch(changeErrorStatus({ isError: true, code: null })));
};

export const fetchFavoritePlacesAction = () => (dispatch, _getState, api) => {
  return api
    .get(APIRoute.FAVORITE)
    .then(({ data }) => dispatch(loadFavorites(data)))
    .catch(() => dispatch(changeErrorStatus({ isError: true, code: null })));
};

export const addToFavoriteAction =
  (id, status) => (dispatch, _getState, api) => {
    return api
      .post(`${APIRoute.FAVORITE}/${id}/${status}`)
      .then(({ data }) => data)
      .catch((error) => {
        dispatch(changeErrorStatus({ isError: true, code: null }));
        throw error;
      });
  };

export const sendPlaceReviewAction =
  (id, { rating, comment }) =>
  (dispatch, _getState, api) => {
    console.log("rating, comment", rating, comment);

    return api
      .post(`${APIRoute.COMMENTS}/${id}`, { rating, comment })
      .then(({ data }) => dispatch(addReview(data)))
      .catch(() => dispatch(changeErrorStatus({ isError: true, code: null })));
  };
