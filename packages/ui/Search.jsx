import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchHistory from './components/SearchHistory';

/** @type {React.CSSProperties} */
const focusShadowStyle = {
  boxShadow: '0 0 0 9999px #00000040',
};

/** @type {React.CSSProperties} */
const unfocusShadowStyle = {
  boxShadow: '0 0 0 9999px #00000000',
};

const searchPropTypes = {
  searchCallback: PropTypes.func.isRequired,
  focusCallback: PropTypes.func,
  placeholder: PropTypes.string,
  useFocusShadow: PropTypes.bool,
};

/**
 * A search bar component that takes dynamic data for dynamic query.
 * The database query function should receive a single parameter RPC call
 * @type {React.FC<import('prop-types').InferProps<searchPropTypes>>}
 */
const Search = ({ placeholder, searchCallback, focusCallback, useFocusShadow }) => {
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

  const [searchHistory, setSearchHistory] = useState(['hello', 'world']);
  const [rawText, setRawText] = useState('');
  const [focusStyle, setFocusStyle] = useState(unfocusShadowStyle);

  /**
   * searchFocusHandler sets the state of the shadowBox style.
   * @param {boolean} isFocus
   */
  const searchFocusHandler = (isFocus) => {
    let callbackFocus = false;
    if (isFocus && inputRef.current.value !== '') {
      setFocusStyle(focusShadowStyle);
      callbackFocus = true;
    } else {
      setFocusStyle(unfocusShadowStyle);
    }
    if (focusCallback) focusCallback(callbackFocus);
  };

  /**
   * Debounce just to make sure the changing of style don't happent too often
   * else there's too many renders
   * @param {boolean} isFocus
   */
  const debouncedInputs = (isFocus) => {
    if (!useFocusShadow) return;

    const later = () => {
      clearTimeout(timeout.current);
      searchFocusHandler(isFocus);
    };

    clearTimeout(timeout.current);
    timeout.current = setTimeout(later, 500);
  };

  /**
   * The setInput function would not be using the text / rawText state
   * as it may not pose as the accurate state value
   * @param {React.SyntheticEvent} e
   */
  const setInput = (e) => {
    const eventType = e.type;
    switch (eventType) {
      case 'keydown':
        if (e.key !== 'Enter') {
          debouncedInputs(true);
          return;
        }
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

  const filteredHistory = () =>
    searchHistory.filter((history) => history.startsWith(inputRef.current?.value ?? ''));

  return (
    <div
      className="form-control w-full"
      style={{ transition: 'box-shadow 0.3s ease-in-out', ...focusStyle }}
      onFocus={() => debouncedInputs(true)}
      onBlur={() => debouncedInputs(false)}
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
      <SearchHistory
        searchHistory={filteredHistory()}
        onClickCallback={(text) => console.log(text)}
      />
    </div>
  );
};

Search.propTypes = searchPropTypes;

Search.defaultProps = {
  placeholder: 'Search...',
  useFocusShadow: true,
};

export default Search;
