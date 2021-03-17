import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';
import {connect} from 'react-redux';
import {addToFavorite} from '../../store/api-actions';
import {AppRoute, ButtonName} from '../../common/const';
import {changeFavoriteStatus} from '../../store/reducer/offers/offers-action';
import {getIsloggedInStatus} from '../../store/reducer/user/selectors';
import {loadPlaceInfo} from '../../store/reducer/place-info/place-info-action';

const ButtonSettings = {
  [ButtonName.PROPERTY]: {
    iconSize: {
      width: 31,
      height: 33
    }
  },
  [ButtonName.PLACE_CARD]: {
    iconSize: {
      width: 18,
      height: 19
    }
  }
};

const FavoriteButton = (props) => {
  const {
    isFavorite,
    buttonName,
    addToFavorites,
    placeId,
    isUserLoggedIn,
    updatePlaceInfo,
    changeStatus
  } = props;

  const [favorite, setFavorite] = useState(!isFavorite);
  const history = useHistory();

  const favoriteStatus = Number(favorite);

  const handleFavoriteButtonClick = () => {
    if (!isUserLoggedIn) {
      history.push(AppRoute.LOGIN);
      return;
    }

    if (buttonName === ButtonName.PROPERTY) {
      addToFavorites(placeId, favoriteStatus)
        .then((data) => updatePlaceInfo(data));
    }

    if (buttonName === ButtonName.PLACE_CARD) {
      addToFavorites(placeId, favoriteStatus)
      .then((data) => changeStatus(data));
    }

    setFavorite(!favorite);
  };

  return (
    <button
      className={`${buttonName}__bookmark-button
      ${isFavorite
      ? `${buttonName}__bookmark-button--active`
      : ``} button`
      }
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg
        className={`${buttonName}__bookmark-icon`}
        width={ButtonSettings[buttonName].iconSize.width}
        height={ButtonSettings[buttonName].iconSize.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  buttonName: PropTypes.string.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  placeId: PropTypes.number.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  updatePlaceInfo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: getIsloggedInStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorites: (id, status) => dispatch(addToFavorite(id, status)),
    updatePlaceInfo: (data) => dispatch(loadPlaceInfo(data)),
    changeStatus: (data) => dispatch(changeFavoriteStatus(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
