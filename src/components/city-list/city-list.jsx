import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const CityList = (props) => {
  const {cities} = props;
  const {activeCity} = useSelector((state) => state.OFFER);

  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => {
          return (
            <li
              className="locations__item"
              key={city}>
              <Link
                to={`/city/${city}`}
                className={
                  `locations__item-link tabs__item
                  ${(city === activeCity) ? `tabs__item--active` : ``}`
                }
              >
                <span>{city}</span>
              </Link>
            </li>
          );
        })
      }
    </ul>
  );
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired,
};

export default CityList;
