import {NameSpace} from "../root-reducer";

export const getPlaceReviews = (state) => state[NameSpace.REVIEW].placeReviews;

export const getIsReviewsLoaded = (state) => state[NameSpace.REVIEW].isReviewsLoaded;
