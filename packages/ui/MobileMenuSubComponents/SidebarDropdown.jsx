// ------------------ Imports ------------------

import { useState } from 'react';
import { node, string } from 'prop-types';
import { MdArrowForwardIos } from 'react-icons/md';
import cx from 'classnames';

/**
 * The Item represents each tab in the HamburgerMenu
 * @type {function({name: string, children: node})}
 */
const SidebarDropdown = ({ name, customIcon,  children }) => {
  // ------------------ useStates -----------------
  const [open, setOpen] = useState(false);

  // ------------------ Handles -----------------

  // toggle state : has children
  const toggle = () => {
    setOpen(!open);
  };

  // ------------------ Return -----------------
  return (
    <>
      <div
        onClick={toggle}
        role="presentation"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-focus text-white"
      >
        {customIcon}
        <span className="text-[15px] ml-4 text-base-200 font-bold">{name}</span>
        <span
          role="presentation"
          className={cx('text-sm -rotate-0 ml-48', { 'rotate-90': open })}
        >
          <MdArrowForwardIos />
        </span>
      </div>
      <ul
        className={cx('block text-left text-sm mt-2 w-4/5 mx-auto text-base-200 font-bold', {
          hidden: !open,
        })}
      >
        {children}
      </ul>
    </>
  );
};

SidebarDropdown.propTypes = {
  name: string.isRequired,
  customIcon: node,
  children: node,
};

export default SidebarDropdown;
