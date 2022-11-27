/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from 'next/link';
import { useState } from 'react';
import ChatDiv from './ChatDiv';
//  const [selected, setSelected] = useState(options[0]);
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

const options = ['All Chats', 'Selling', 'Buying', 'Archived'];

const ChatList = () => {
  //  var filteredData = data
  const [filteredData, setFilteredData] = useState(data);
  const [isHovering, setIsHovering] = useState(false);
  const [isListChecked, setIsListChecked] = useState([]);
  const [selected, setSelected] = useState(options[0]);

  // useEffect(() => {

  // },[filteredData])
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  function filterChatList(data1) {
    return data1.type === selected;
  }

  const submit = () => {
    // console.log(selected);
    console.log(selected);
    if (selected === 'All Chats') {
      setFilteredData(data);
      // console.log(filteredData)
    } else {
      const test = data.filter(filterChatList);
      console.log(test);
      setFilteredData(data.filter(filterChatList));
      console.log(filteredData);
      // filteredData = data.filter(filterChatList)
    }

    // console.log(filteredData);
  };

  // const handleMouseOut = () => {};

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
          {/* <label tabIndex={0} className="btn m-1 ">
            All Chats
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </label> */}

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
          <div className="w-1/2 flex justify-end mr-auto p-3  ">
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
