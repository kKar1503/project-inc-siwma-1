import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * A search bar component that takes dynamic data for dynamic query.
 * The database query function should receive a single parameter RPC call
 * @param {ComponentProps}
 */
const Search = ({ placeholder, supabaseClient, rpc, callback, loading }) => {
  /**
   * Setting up the input ref, as the search text is really only need to
   * be set once during the onClick() event
   * The text should still be stored to preserve local "history search"
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const inputRef = useRef(null);
  const [text, setText] = useState('');

  const onClickHandler = () => {};

  useEffect(() => {
    console.log('rendered');
  }, []);

  return (
    <div className="form-control w-full">
      <div className="input-group">
        <input type="text" placeholder={placeholder} className="input input-bordered w-full" />
        <button className="btn btn-square" onClick={onClickHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  supabaseClient: PropTypes.func.isRequired,
  rpc: PropTypes.func.isRequired,
  callback: PropTypes.func,
  loading: PropTypes.func,
};

Search.defaultProps = {
  placeholder: 'Search...',
};

export default Search;
