// ------------------ Imports ------------------

import {node, string} from 'prop-types';
import Link from 'next/link';
/**
 * The Item represents each tab in the HamburgerMenu
 * @type {function({name: string, customIcon: node, redirectLink: string})}
 */
const SidebarItem = ({name, customIcon, redirectLink}) =>
  // ------------------ Return -----------------
  (
    <Link
      href={redirectLink}
      className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-focus text-white"
    >
      {customIcon}
      <span className="text-[15px] ml-4 text-base-200 font-bold">{name}</span>
    </Link>
  )
;

SidebarItem.propTypes = {
  name: string.isRequired,
  customIcon: node,
  redirectLink: string,
};

export default SidebarItem;
