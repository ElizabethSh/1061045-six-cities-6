import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SortType} from '../../common/const';
import {capitalizeString} from '../../common/utils';
import {ActionCreator} from '../../store/action';
import {sortTypeProp} from '../../common/prop-types/sort-type.prop';

const sortTypes = Object.values(SortType);

const Sort = (props) => {
  const {sortType, setSortType} = props;
  const [isSortOpen, setSortState] = useState(false); // стейт самого компонента

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => setSortState(!isSortOpen)}
      >
        {capitalizeString(sortType)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={
          `places__options places__options--custom ${isSortOpen ? `places__options--opened` : `` }`
        }
        onClick={(evt) => {
          setSortType(evt.target.type);
          setSortState(!isSortOpen);
        }}
      >
        {
          sortTypes.map((type, index) => (
            <li key={`${type}-${index}`}
              className={`places__option ${sortType === type ? `places__option--active` : ``}`}
              tabIndex="0"
              type={type}
            >
              {capitalizeString(type)}
            </li>
          ))
        }
      </ul>
    </form>
  );
};

Sort.propTypes = {
  sortType: sortTypeProp,
  setSortType: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    sortType: state.reducer.sortType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortType: (sortType) => dispatch(ActionCreator.setSortTypeAction(sortType))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
