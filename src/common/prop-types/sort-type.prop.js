import PropTypes from 'prop-types';
import {SortType} from '../const';

export const sortTypeProp = PropTypes.oneOf(
    [SortType.POPULAR, SortType.PRICE_HIGHT_TO_LOW, SortType.PRICE_LOW_TO_HIGHT, SortType.TOP_RATED]
);
