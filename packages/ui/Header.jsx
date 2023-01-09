/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import Link from 'next/link';
import SIWMALogo from './public/siwma-logo.png';
import SIWMALogoFull from './public/siwma-logo-full.png';
import { useEffect, useState} from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Header = () => {
    const [unreadMsg, setUnreadMsg] = useState([]);

  // Fetches rows from 'messages' table with status of 'unread'
  const fetchUnreadMsgs = async () => {
    const { data: messages, error } = await supabase
      .rpc('get_msg_with_name')
      .select(`*`)

    if (error) {
      console.log(error);
    } else {
      console.log(messages);
      setUnreadMsg(messages)
    }
  }

  useEffect(() => {
    fetchUnreadMsgs()
  },[]);
  return(
    <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="http://localhost:3000">Item 1</Link>
          </li>
          <li tabIndex={0}>
            <Link className="justify-between" href="http://localhost:3000">
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </Link>
            <ul className="p-2">
              <li>
                <Link href="http://localhost:3000">Submenu 1</Link>
              </li>
              <li>
                <Link href="http://localhost:3000">Submenu 2</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="http://localhost:3000">Item 3</Link>
          </li>
        </ul>
      </div>
      <Link className="btn btn-ghost" href="http://localhost:3000">
        <Image
          src={SIWMALogo}
          className="min-[320px]:h-[30px] h-full min-[320px]:w-[270px] w-full object-cover lg:hidden"
        />
        <Image src={SIWMALogoFull} className="h-full w-full object-cover hidden lg:flex" />
      </Link>
      <ul className="menu menu-horizontal p-0 hidden lg:flex">
        <li tabIndex={0}>
          <Link href="http://localhost:3000">
            Categories
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </Link>
          <ul className="p-2">
            <li>
              <Link href="http://localhost:3000">Category 1</Link>
            </li>
            <li>
              <Link href="http://localhost:3000">Category 2</Link>
            </li>
            <li>
              <Link href="http://localhost:3000">Category 3</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div className="navbar-end hidden sm:flex">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image src="/../public/sample-profile-image.jpg" alt="Person" width={20} height={20} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link className="justify-between" href="http://localhost:3000">
              Profile
            </Link>
          </li>
          <li>
            <Link href="http://localhost:3000">Settings</Link>
          </li>
          <li>
            <Link href="http://localhost:3000">Logout</Link>
          </li>
        </ul>
      </div>
      <div className='dropdown dropdown-end'>
        <button className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs badge-primary indicator-item rounded-full">{unreadMsg.length}</span>
        </div>
      </button>

      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96">
        <p className='ml-4 mb-2 text-3xl font-bold'>Notifications</p>
        <li>
          {unreadMsg.map((msg) => {
            if (msg.text != null && msg.text !== '') {
              return (
                <div>
                  <div className="avatar">
                    <div className="w-12 rounded-3xl">
                      <img src="https://placeimg.com/192/192/people" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="font-bold text-lg">{msg.name}</p>
                    <p className="leading-4 text-s text-gray-400">
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            }

            if (msg.offer != null) {
              return (
                <div>
                  <div className="avatar">
                    <div className="w-12 rounded-3xl">
                      <img src="https://placeimg.com/192/192/people" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="font-bold text-lg">{msg.name}</p>
                    {/* TO DO: Add product name */}
                    <p className="leading-4 text-s text-gray-400">
                      offered you SGD {msg.offer}
                    </p>
                  </div>
                </div>
              );
            }

            if (msg.image != null) {
              return (
                <div>
                  <div className="avatar">
                    <div className="w-12 rounded-3xl">
                      <img src="https://placeimg.com/192/192/people" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="font-bold text-lg">{msg.name}</p>
                    <p className="leading-4 text-s text-gray-400">
                      Attached an image
                    </p>
                  </div>
                </div>
              );
            }

            if (msg.file != null) {
              return (
                <div>
                  <div className="avatar">
                    <div className="w-12 rounded-3xl">
                      <img src="https://placeimg.com/192/192/people" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="font-bold text-lg">{msg.name}</p>
                    <p className="leading-4 text-s text-gray-400">
                      Attached a file
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </li>
      </ul>

      </div>

      <button className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"
            />
          </svg>
          <span className="badge badge-xs badge-primary indicator-item rounded-full">8</span>
        </div>
      </button>
    </div>
  </div>

  )

}
  
export default Header;
