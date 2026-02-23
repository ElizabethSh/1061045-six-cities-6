import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CardName } from "../../common/const";
import PlaceCard from "../place-card/place-card";
import { placeProp } from "../../common/prop-types/place.prop";

const FavoritesLocations = ({ places, city }) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`/city/${city}`}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {places.map((place) => {
          return (
            <PlaceCard
              cardName={CardName.FAVORITES}
              key={place.id}
              place={place}
            />
          );
        })}
      </div>
    </li>
  );
};

FavoritesLocations.propTypes = {
  city: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape(placeProp)).isRequired,
};

export default FavoritesLocations;
