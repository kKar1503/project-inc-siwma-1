/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from 'next/link';
import { useState } from 'react';
import ChatDiv from './ChatDiv';

const data = [
  {
    id: 1,
    name: '',
    lastMessage: '',
    type: 'selling',
    ischeck: false,
  },
  {
    id: 2,
    name: '',
    lastMessage: '',
    type: 'selling',
    ischeck: false,
  },
  {
    id: 3,
    name: '',
    lastMessage: '',
    type: 'selling',
    ischeck: false,
  },
];

const ChatList = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isListChecked, setIsListChecked] = useState([]);

  const handleMouseOver = () => {
    setIsHovering(true);
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
        <input
          type="text"
          placeholder="Search messages, listings, usernames"
          className="input input-bordered input-primary w-full max-w-xs"
        />

        <div className="dropdown">
          <label tabIndex={0} className="btn m-1 border-white">
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
          </label>
          <ul className="dropdown-content menu p-2 bg-base-300 rounded-box w-52">
            <li>
              <Link href="/">All Chats</Link>
            </li>
            <li>
              <Link href="/">Selling</Link>
            </li>
            <li>
              <Link href="/">Buying</Link>
            </li>
            <li>
              <Link href="/">Archived</Link>
            </li>
          </ul>
        </div>

        {isListChecked.length > 0 && (
          <div className="w-1/2 flex justify-end mr-auto">
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
          {/* <div className="drawer-content flex flex-col items-center justify-center">
             <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
              Open drawer
            </label>
          </div> */}
          <div onMouseOver={handleMouseOver} onFocus={handleMouseOver} className="drawer-side">
            {/* <label htmlFor="my-drawer-2" className="drawer-overlay" />
            <input id='my-drawer-2' /> */}
            <ul className="menu p-4 overflow-y-auto w-110 bg-base-200 text-base-content">
              {data.map((item) => (
                <ChatDiv isCheckCallback={(isChecked) => handleCheck(item.id, isChecked)} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
