import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

/** @type {React.CSSProperties} */
const focusShadowStyle = {
  boxShadow: '0 0 0 9999px #00000040',
};

/** @type {React.CSSProperties} */
const unfocusShadowStyle = {
  boxShadow: '0 0 0 9999px #00000000',
};

/**
 * A search bar component that takes dynamic data for dynamic query.
 * The database query function should receive a single parameter RPC call
 * @param {ComponentProps}
 */
const Search = ({ placeholder, searchCallback, focusCallback }) => {
  /**
   * Setting up the input ref, as the search text is really only need to
   * be set once during the onClick() event
   * The text should still be stored to preserve local "history search"
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const inputRef = useRef();

  /**
   * Use a ref to store the timeout between renders
   * and prevent changes to it from causing re-renders
   * @type {React.MutableRefObject<NodeJS.Timeout>}
   */
  const timeout = useRef();

  const [search, setSearchHistory] = useState([]);
  const [rawText, setRawText] = useState('');
  const [focusStyle, setFocusStyle] = useState(unfocusShadowStyle);

  // const debouncedInputs = useCallback(
  //   (...args) => {
  //     const later = () => {
  //       clearTimeout(timeout.current);
  //       searchFocusHandler(...args);
  //     };

  //     clearTimeout(timeout.current);
  //     timeout.current = setTimeout(later, 500);
  //   },
  //   [func, wait]
  // );

  /**
   * The setInput function would not be using the text / rawText state
   * as it may not pose as the accurate state value
   * @param {React.SyntheticEvent} e
   */
  const setInput = (e) => {
    const eventType = e.type;
    switch (eventType) {
      case 'keydown':
        if (e.key !== 'Enter') return;
        break;
      case 'click':
        if (e.button !== 0) return;
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('How in the world u get here');
    }
    const textValue = inputRef.current.value;
    searchCallback(textValue);
  };

  /**
   * searchFocusHandler sets the state on a debounce when the use first type.
   * @param {boolean} isFocus
   */
  const searchFocusHandler = (isFocus) => {
    if (isFocus) {
      setFocusStyle(focusShadowStyle);
    } else {
      setFocusStyle(unfocusShadowStyle);
    }
    if (focusCallback) focusCallback(isFocus);
  };

  return (
    <div
      className="form-control w-full"
      style={{ transition: 'box-shadow 0.3s ease-in-out', ...focusStyle }}
    >
      <div className="input-group">
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full"
          onKeyDown={setInput}
          ref={inputRef}
        />
        <button className="btn btn-square" onClick={setInput}>
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
  searchCallback: PropTypes.func.isRequired,
  focusCallback: PropTypes.func,
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'Search...',
};

export default Search;
