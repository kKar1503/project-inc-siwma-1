/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import Autocomplete from 'react-autocomplete';
import { useState, useEffect } from 'react';

const ChatFilter = ({
  options,
  setSelectedFilter,
  retrieveFilteredData,
  selectedFilter,
  roomsData,
}) => {
  const [inputValue, setValue] = useState('');
  // const [selectedRoom, setSelectedRoom] = useState(''); // define selectedRoom in state
  return (
    <div className="flex pt-2 md:pt-0 pb-2 md:pb-0 items-start md:items-center flex-col md:flex-row">
      <div className="dropdown pb-2 md:pb-0">
        <select
          className="btn bg-blue-300 text-white hover:bg-transparent hover:text-blue-300 border-none px-2 mx-4 appearance-none"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          onClick={retrieveFilteredData}
          style={{ display: 'block' }} // Add this line
        >
          {options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control pl-4 md:pl-0">
        <div className="input-group">
          <Autocomplete
            inputProps={{
              type: 'text',
              placeholder: 'Chat History',
              autoComplete: 'on', // add this line to enable autocomplete
              className: 'input input-bordered',
              style: {
                borderTopLeftRadius: 'var(--rounded-btn, 0.5rem) !important',
                borderBottomLeftRadius: 'var(--rounded-btn, 0.5rem) !important',
              },
            }}
            menuStyle={{ display: 'block' }}
            getItemValue={(item) => item.name}
            items={roomsData}
            renderItem={(item, isHighlighted) => (
              <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.name}
              </div>
            )}
            value={inputValue}
            onChange={(e) => {
              setValue(e.target.value);
              // setSelectedRoom(e.target.value); // update selectedRoom when the input value changes
            }}
            onSelect={(val) => {
              console.log(val);
              setValue(val);
              //  setSelectedRoom(val); // Update selectedRoom in parent component
            }}
          />
          <button
            className="btn btn-square"
            style={{
              borderTopRightRadius: 'var(--rounded-btn, 0.5rem) !important',
              borderBottomRightRadius: 'var(--rounded-btn, 0.5rem) !important',
            }}
          >
            <BiSearch className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

ChatFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  retrieveFilteredData: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  roomsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lastMessage: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      ischeck: PropTypes.bool.isRequired,
    })
  ),
};

export default ChatFilter;
