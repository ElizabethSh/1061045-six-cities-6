import {combineReducers} from "redux";
import {offers} from './offers/offers';
import {user} from "./user/user";
import {reviews} from "./reviews/reviews";
import {sort} from "./sort/sort";

export const NameSpace = {
  USER: `USER`,
  REVIEW: `REVIEW`,
  SORT: `SORT`,
  OFFER: `OFFER`
};

export const rootReducer = combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.REVIEW]: reviews,
  [NameSpace.SORT]: sort,
  [NameSpace.OFFER]: offers
});
