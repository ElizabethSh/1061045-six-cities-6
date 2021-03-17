import {combineReducers} from "redux";
import {offers} from './offers/offers';
import {user} from "./user/user";
import {reviews} from "./reviews/reviews";
import {sort} from "./sort/sort";
import {placeInfo} from "./place-info/place-info";

export const NameSpace = {
  USER: `USER`,
  REVIEW: `REVIEW`,
  SORT: `SORT`,
  OFFER: `OFFER`,
  PLACE_INFO: `PLACE_INFO`
};

export const rootReducer = combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.REVIEW]: reviews,
  [NameSpace.SORT]: sort,
  [NameSpace.OFFER]: offers,
  [NameSpace.PLACE_INFO]: placeInfo
});
