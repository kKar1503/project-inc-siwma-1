import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ value, setValue, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={setValue}
    className="input input-bordered w-full"
  />
);
SearchBar.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
