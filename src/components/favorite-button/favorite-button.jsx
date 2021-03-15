import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';
import {connect} from 'react-redux';
import {addToFavorite} from '../../store/api-actions';
import {AppRoute, ButtonName} from '../../common/const';

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
    isUserLoggedIn
  } = props;

  const [favorite, setFavorite] = useState(!isFavorite); // можно ли так делать?
  const history = useHistory();

  const favoriteStatus = Number(favorite);

  const handleFavoriteButtonClick = () => {
    if (!isUserLoggedIn) {
      history.push(AppRoute.LOGIN);
      return;
    }

    addToFavorites(placeId, favoriteStatus);
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
      onClick={handleFavoriteButtonClick} // temp
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
};

const mapStateToProps = ({USER}) => {
  return {
    isUserLoggedIn: USER.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorites: (id, status) => dispatch(addToFavorite(id, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
