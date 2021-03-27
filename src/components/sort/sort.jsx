import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SortType} from '../../common/const';
import {capitalizeString} from '../../common/utils';
import {setSortType} from '../../store/reducer/sort/action';

const sortTypes = Object.values(SortType);

const Sort = () => {
  const [isSortOpen, setSortState] = useState(false);
  const {sortType} = useSelector((state) => state.SORT);
  const dispatch = useDispatch();

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
          dispatch(setSortType(evt.target.type));
          setSortState(!isSortOpen);
        }}
      >
        {
          sortTypes.map((type, index) => (
            <li key={`${type}-${index}`}
              className={
                `places__option ${sortType === type ? `places__option--active` : ``}`
              }
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

export default Sort;
