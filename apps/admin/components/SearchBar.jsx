import PropTypes from 'prop-types';

const SearchBar = ({ value, setValue, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="input input-bordered w-full"
  />
);

SearchBar.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
