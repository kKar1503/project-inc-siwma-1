import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';

const searchHistoryKey = 'searchHistory';

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
  historyCount: PropTypes.number,
  searchType: PropTypes.oneOf(['startsWith', 'includes']),
};

/**
 * A search bar component that takes dynamic data for dynamic query.
 * The database query function should receive a single parameter RPC call
 * @type {React.FC<import('prop-types').InferProps<searchPropTypes>>}
 */
const Search = ({
  placeholder,
  searchCallback,
  focusCallback,
  useFocusShadow,
  historyCount,
  searchType,
}) => {
  /**
   * Setting up the input ref, as the search text is really only need to
   * be set once during the onClick() event
   * The text should still be stored to preserve local "history search"
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const inputRef = useRef();

  /**
   * Setting up the search component ref to remove the focus after search.
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const searchRef = useRef();

  /**
   * Setting up the search button ref to remove the focus after search.
   * @type {React.MutableRefObject<HTMLButtonElement>}
   */
  const buttonRef = useRef();

  /**
   * Use a ref to store the timeout between renders
   * and prevent changes to it from causing re-renders
   * @type {React.MutableRefObject<NodeJS.Timeout>}
   */
  const timeout = useRef();

  /** @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} */
  const [searchHistory, setSearchHistory] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  /**
   * addNewSearch simply adds the current text into the localStorage of
   * searchHistory, but it also checks if the same search history already
   * exists to prevent dupes.
   * @param {string} searchValue
   */
  const addNewSearch = (searchValue) => {
    let newHistory;
    if (searchHistory.includes(searchValue)) {
      newHistory = [searchValue, ...searchHistory.filter((v) => v !== searchValue)];
    } else {
      newHistory = [searchValue, ...searchHistory];
    }
    setSearchHistory(newHistory);
    localStorage.setItem(searchHistoryKey, JSON.stringify(newHistory));
  };

  /**
   * filteredSearch returns the filtered version of the search.
   * useMemo is used in the case of user quickly retyping and then backspacing
   * and using the exact same value.
   */
  const filteredSearch = useMemo(() => {
    if (textValue === '') return searchHistory.slice(0, historyCount);
    return searchHistory
      .filter((v) => v[searchType](textValue))
      .sort((a, b) => a.length - b.length)
      .slice(0, historyCount - 1);
  }, [searchHistory, searchType, textValue, historyCount]);

  /**
   * searchFocusHandler sets the state of the shadowBox style.
   * @param {boolean} isFocus
   */
  const searchFocusHandler = (isFocus) => {
    if (isFocus === isSearchFocus) return;
    setShowSearchHistory(isFocus);
    setIsSearchFocus(isFocus);
    if (focusCallback) focusCallback(isFocus);
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
      if (inputRef !== null && inputRef.current !== null) setTextValue(inputRef.current.value);
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
    const inputValue = inputRef.current.value;
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
        throw new Error('How in the world u get here');
    }
    if (inputValue === '') return;
    searchCallback(inputValue);
    addNewSearch(inputValue);
    inputRef.current.blur();
    buttonRef.current.blur();
    searchRef.current.blur();
    searchFocusHandler(false);
  };

  const clickedHistory = (text) => {
    setTextValue(text);
    inputRef.current.value = text;
  };

  const deleteHistory = (text) => {
    const newHistory = searchHistory.filter((v) => v !== text);
    setSearchHistory(newHistory);
    localStorage.setItem(searchHistoryKey, JSON.stringify(newHistory));
  };

  const focusStyle = useMemo(
    () => (isSearchFocus ? focusShadowStyle : unfocusShadowStyle),
    [isSearchFocus]
  );

  useEffect(() => {
    const storageHistory = JSON.parse(localStorage.getItem(searchHistoryKey));
    if (storageHistory === null) localStorage.setItem(searchHistoryKey, JSON.stringify([]));
    setSearchHistory(storageHistory);
  }, []);

  return (
    <div
      className="form-control w-full"
      style={{
        transition: 'box-shadow 0.3s ease-in-out',
        zIndex: 30,
        position: 'relative',
        ...focusStyle,
      }}
      onFocus={() => debouncedInputs(true)}
      onBlur={() => debouncedInputs(false)}
      ref={searchRef}
    >
      <div className="input-group">
        <input
          type="text"
          placeholder={placeholder}
          className={`input input-bordered w-full ${styles['search-input']}`}
          onKeyDown={setInput}
          ref={inputRef}
        />

        <button className="btn btn-square" onClick={setInput} ref={buttonRef}>
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
      <div className={`w-full ${styles['search-history']}`}>
        {showSearchHistory && filteredSearch.length !== 0 && (
          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full dropdown-open">
            {filteredSearch.map((history, i) => (
              // eslint-disable-next-line react/no-array-index-key, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <li key={i} className="w-full" onClick={() => clickedHistory(history)}>
                <div className="flex gap-0 w-full">
                  <button className="flex-1 text-left truncate">{history}</button>
                  <button
                    className="flex-none btn btn-circle btn-ghost btn-sm z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHistory(history, e);
                    }}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Search.propTypes = searchPropTypes;

Search.defaultProps = {
  placeholder: 'Search...',
  useFocusShadow: true,
  searchType: 'startsWith',
  historyCount: 5,
};

export default Search;
