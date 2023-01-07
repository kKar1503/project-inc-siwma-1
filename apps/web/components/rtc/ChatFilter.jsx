/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';

const ChatFilter = ({ options, setSelectedFilter, retrieveFilteredData, selectedFilter }) => (
  <div className="flex items-center">
    <div className="dropdown">
      <select
        className="btn bg-blue-300 text-white hover:bg-transparent hover:text-blue-300 border-none px-2 mx-4 appearance-none"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        onClick={retrieveFilteredData}
      >
        {options.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Chat History"
          className="input input-bordered"
          style={{
            borderTopLeftRadius: 'var(--rounded-btn, 0.5rem) !important;',
            borderBottomLeftRadius: 'var(--rounded-btn, 0.5rem) !important;',
          }}
        />
        <button
          className="btn btn-square"
          style={{
            borderTopRightRadius: 'var(--rounded-btn, 0.5rem) !important;',
            borderBottomRightRadius: 'var(--rounded-btn, 0.5rem) !important;',
          }}
        >
          <BiSearch className="text-2xl" />
        </button>
      </div>
    </div>
  </div>
);

ChatFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  retrieveFilteredData: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default ChatFilter;
