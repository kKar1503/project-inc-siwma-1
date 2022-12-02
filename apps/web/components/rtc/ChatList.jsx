/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from 'next/link';
import { useState } from 'react';
import ChatDiv from './ChatDiv';

const data = [
  {
    id: 1,
    name: 'adeeb',
    lastMessage: '',
    type: 'Buying',
    ischeck: false,
  },
  {
    id: 2,
    name: 'melon',
    lastMessage: '',
    type: 'Selling',
    ischeck: false,
  },
  {
    id: 3,
    name: 'george',
    lastMessage: '',
    type: 'Selling',
    ischeck: false,
  },
  {
    id: 4,
    name: 'shelby',
    lastMessage: '',
    type: 'Buying',
    ischeck: false,
  },
  {
    id: 5,
    name: 'louis',
    lastMessage: '',
    type: 'Selling',
    ischeck: false,
  },
  {
    id: 6,
    name: 'charmaine',
    lastMessage: '',
    type: 'Buying',
    ischeck: false,
  },
];

// What are the data i should retrieve?
// ANS: I should be retrieving the rooms under the buyer

// Whar are the contents needed in a chat?
// ANS: Seller Details, Buyer Details, Listing Details

const options = ['All Chats', 'Selling', 'Buying', 'Archived'];

const ChatList = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [isHovering, setIsHovering] = useState(false);
  const [isListChecked, setIsListChecked] = useState([]);
  const [selected, setSelected] = useState(options[0]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  function filterChatList(data1) {
    return data1.type === selected;
  }

  const submit = () => {
    if (selected === 'All Chats') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(filterChatList));
    }
  };

  const handleCheck = (id, isChecked) => {
    if (isChecked) {
      if (isListChecked.indexOf(id) === -1) setIsListChecked([...isListChecked, id]);
    } else {
      setIsListChecked([...isListChecked.filter((v) => v !== id)]);
    }
  };

  return (
    <div>
      <main />
      <div>
        {/* Search function not implemented yet */}
        <input
          type="text"
          placeholder="Search messages, listings, usernames"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="dropdown">
          <select
            className="btn m-1 rounded-box "
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            onClick={submit}
          >
            {options.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {isListChecked.length > 0 && (
          <div className="w-1/2 flex justify-end mr-auto p-3">
            <div>
              <button className="btn btn-primary mr-2">Delete</button>
            </div>
            <div>
              <button className="btn btn-primary">Archive</button>
            </div>
          </div>
        )}

        <div className="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div onMouseOver={handleMouseOver} onFocus={handleMouseOver} className="drawer-side">
            <ul className="menu p-4 overflow-y-auto bg-base-200 text-base-content">
              {filteredData.map((item) => (
                <ChatDiv
                  key={item.id}
                  isCheckCallback={(isChecked) => handleCheck(item.id, isChecked)}
                  members={data[item.id - 1]}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
