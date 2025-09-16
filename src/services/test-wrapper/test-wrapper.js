import React from "react";
import PropTypes from "prop-types";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { createAPI } from "../api";
import { SortType } from "../../common/const";
import { offers, nearPlaces } from "./test-data";

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const TestWrapper = (props) => {
  const { children, url } = props;
  const store = mockStore({
    CARD: { activeCard: 0 },
    USER: {
      isLoggedIn: true,
      isAuthChecked: true,
      usersEmail: `keks@test.com`,
    },
    PLACE_INFO: { placeInfo: offers[0], isPlaceInfoLoaded: true },
    SORT: { sortType: SortType.POPULAR },
    OFFER: {
      activeCity: `Paris`,
      isOffersLoaded: true,
      isError: false,
      offers,
    },
    NEAR_PLACE: {
      isNearPlacesLoaded: true,
      nearPlaces,
    },
    REVIEW: { placeReviews: [], isReviewsLoaded: true },
  });

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={url ? [url] : undefined}>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

TestWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  url: PropTypes.string,
};

export default TestWrapper;
