import PropTypes from 'prop-types';

const SearchBar = ({ filter, setFilter, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="input input-bordered w-full"
  />
);

SearchBar.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
