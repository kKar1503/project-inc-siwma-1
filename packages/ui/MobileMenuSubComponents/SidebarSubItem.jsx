// ------------------ Imports ------------------

import { node, string } from 'prop-types';
import Link from 'next/link';

/**
 * SubMenuItem is a drawer item that is displayed by a MenuItem
 * @type {function({name: string, customIcon: node, redirectLink: string})}
 */
const SidebarSubItem = ({ name, customIcon, redirectLink }) =>
  // ------------------ Return -----------------
  (
    <li className="cursor-pointer p-2 hover:bg-primary-focus rounded-md mt-1 hover:text-base-200 text-black">
      <Link href={redirectLink}>{name} {customIcon}</Link>
    </li>
    // <div role="presentation" onClick={onClickHandle}>
    //   <h1 className="cursor-pointer p-2 hover:bg-primary-focus rounded-md mt-1">
    //     {name} {customIcon}
    //   </h1>
    // </div>
  )
;

SidebarSubItem.propTypes = {
  name: string.isRequired,
  customIcon: node,
  redirectLink: string,
};

export default SidebarSubItem;
