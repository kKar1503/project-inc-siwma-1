import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const searchHistoryProps = {
  searchHistory: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

/**
 *
 * @type {React.FC<import('prop-types').InferProps<searchHistoryProps>>}
 */
const SearchHistory = ({ searchHistory, onClickCallback }) => {
  useEffect(() => console.log('render'));
  return (
    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 dropdown-open">
      {searchHistory.map((history, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>
          <button onClick={() => onClickCallback(history)}>{history}</button>
        </li>
      ))}
    </ul>
  );
};

SearchHistory.propTypes = searchHistoryProps;

export default SearchHistory;
