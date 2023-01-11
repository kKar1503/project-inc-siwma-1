/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {useMemo, useState} from 'react';
import {MdAdd, MdChat, MdDashboard, MdLogin, MdLogout} from 'react-icons/md';
import SIWMALogo from './public/siwma-logo.png';
import SIWMALogoFull from './public/siwma-logo-full.png';
import {MobileMenu} from './index';

const Header = ({categoryData, isLoggedIn}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const iconContextValue = useMemo(() => ({
    color: '#9c3636'
    // color: '#9c3636'
  })
  , []);

  return (
    <div className="navbar bg-base-100 border-b-2 border-base-200">
      <div className="navbar-start">
        <div
          className=" lg:hidden"
          // className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-focus text-white"
        >
          <label onClick={toggle} role="presentation" tabIndex={0}>
            <svg
              color="black"
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
          <MobileMenu tabIndex={0}
            open={open} setOpen={setOpen}
            categoryData={categoryData}
            isLoggedIn={isLoggedIn}
          />


        </div>
        <Link className="btn btn-ghost" href="/">
          <Image
            alt="SIWMA Logo"
            src={SIWMALogo}
            className="h-full w-full object-cover lg:hidden"
          />
          <Image src={SIWMALogoFull}
            alt="SIWMA Logo"
            className="h-full w-full object-cover hidden lg:flex"/>
        </Link>

        <ul className="menu menu-horizontal p-0 hidden lg:flex mx-auto">
          <li tabIndex={0}>
            <p className='text-lg ml-4 mx-auto font-bold'><MdDashboard/>Categories</p>
            <ul
              className="p-2 z-40 menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box text-black">
              {categoryData?.map(({name, id}) => (
                <CategoryItem
                  name={name}
                  redirectLink={`/category/${name}?id=${id}`}
                  key={name}
                />
              ))}
            </ul>
          </li>
        </ul>

        <ul className="menu menu-horizontal p-0 hidden lg:flex mx-auto">
          <li tabIndex={0}>
            <Link href='/real-time-chat'
              className='text-lg mx-auto font-bold'><MdChat/>Chat</Link>
          </li>
        </ul>

        <ul className="menu menu-horizontal p-0 hidden lg:flex mx-auto">
          <li tabIndex={0}>
            <Link href='/new-listing' className='text-lg mx-auto font-bold'><MdAdd/>New
              Listing</Link>
          </li>
        </ul>

      </div>
      <div className="navbar-end hidden sm:flex">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="/../public/sample-profile-image.jpg" alt="Person" width={20}
                height={20}/>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            {/* <li> */}
            {/*  <Link className="justify-between" href="/profile"> Profile </Link> */}
            {/* </li> */}
            {/* <li> */}
            {/*  <Link href="/settings">Settings</Link> */}
            {/* </li> */}
            {isLoggedIn
              ? (<li>
                <Link href="/logout"><MdLogout/>Logout</Link>
              </li>)
              : (
                <li>
                  <Link href="/login"><MdLogin/>Login</Link>
                </li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

const CategoryItem = ({name, redirectLink}) => (<li>
  <Link href={redirectLink}>{name}</Link>
</li>)

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  redirectLink: PropTypes.string.isRequired,
}

Header.propTypes = {
  categoryData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
  isLoggedIn: PropTypes.bool,
}
export default Header;
