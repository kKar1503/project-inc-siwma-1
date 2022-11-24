// ------------------ Imports ------------------

import { useState } from 'react';
import { node, string } from 'prop-types';
import { useRouter } from 'next/router';
// todo remove eslint ignores
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdArrowForwardIos } from 'react-icons/md';
// eslint-disable-next-line import/no-unresolved
import cx from 'classnames';

/**
 * The Item represents each tab in the HamburgerMenu
 * @type {React.FC<import('prop-types').InferProps<typeof SidebarItem.propTypes>>}
 */
const SidebarItem = ({ name, customIcon, redirectLink, children }) => {
  // ------------------ useStates -----------------
  const [open, setOpen] = useState(false);

  // ------------------ Misc -----------------
  const router = useRouter();

  // ------------------ Handles -----------------

  const toggle = () => {
    setOpen(!open);
  };

  const redirect = () => (children ? toggle() : router.push(redirectLink));

  // ------------------ Return -----------------
  return (
    <>
      <div
        onClick={redirect}
        role="presentation"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-focus text-white"
      >
        {customIcon && <customIcon />}
        <span className="text-[15px] ml-4 text-base-200 font-bold">{name}</span>
        {children && (
          <span
            role="presentation"
            className={cx('text-sm -rotate-0 ml-48', { 'rotate-90': open })}
          >
            <MdArrowForwardIos />
          </span>
        )}
      </div>
      {children && (
        <div
          className={cx('block text-left text-sm mt-2 w-4/5 mx-auto text-base-200 font-bold', {
            hidden: !open,
          })}
        >
          {children}
        </div>
      )}
    </>
  );
};

SidebarItem.propTypes = {
  name: string.isRequired,
  customIcon: node,
  children: node,
  redirectLink: string,
};

export default SidebarItem;