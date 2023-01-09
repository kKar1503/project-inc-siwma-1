// ------------------ Imports ------------------

import PropTypes, {bool, func} from 'prop-types';
import {MdBookmark, MdChat, MdExitToApp, MdHome} from 'react-icons/md';
import cx from 'classnames';
import SidebarDivider from './MobileMenuSubComponents/SidebarDivider';
import SidebarItem from './MobileMenuSubComponents/SidebarItem';
import SidebarSubItem from './MobileMenuSubComponents/SidebarSubItem';
import SidebarSearch from './MobileMenuSubComponents/SidebarSearch';
import SidebarDropdown from './MobileMenuSubComponents/SidebarDropdown';

// ------------------ Layout Configuration ------------------

/**
 * This component is a central location to customize the HamburgerMenu
 */
const LayoutEditor = ({categoryData, isLoggedIn}) => (
  <>
    {/* eslint-disable-next-line no-alert */}
    <SidebarSearch/>
    <SidebarDivider/>
    <SidebarItem name="Home" redirectLink="/"><MdHome/></SidebarItem>
    <SidebarItem name="Bookmark" redirectLink="/test#bookmark"><MdBookmark/></SidebarItem>
    <SidebarDropdown name="Categories" customIcon={<MdChat/>}>
      {categoryData?.map(({name, id}) => (
        <SidebarSubItem
          name={name}
          redirectLink={`/category/${name}?id=${id}`}
          key={name}
        />
      ))}
    </SidebarDropdown>

    <SidebarDivider/>

    {isLoggedIn ? <SidebarItem name="Logout" redirectLink="/logout"><MdExitToApp/></SidebarItem>
      : <SidebarItem name="Login" redirectLink="/login"><MdExitToApp/></SidebarItem>}
  </>
);

// ------------------ Main Component -----------------
/**
 * The MobileMenu is a hamburger menu only visible on mobile devices
 * @type {function({open: bool,className: string, setOpen: function, isLoggedIn: boolean, categoryData: {name : string,id : number}[]})}  })}
 */
const MobileMenu = ({open, className, setOpen, isLoggedIn, categoryData}) => {
  // ------------------ Handles -----------------
  const closeHandle = () => setOpen(false);

  // ------------------ Return -----------------
  return (
    <div
      className={cx(`h1 z-40 absolute my-2 shadow bg-base-100 rounded-box`, {hidden: !open}, className)}>
      <main>
        {/* todo background color here */}
        <div
          className="w-96  p-2 text-center bg-base-content">
          <LayoutEditor closeHandle={closeHandle} isLoggedIn={isLoggedIn}
                        categoryData={categoryData}/>
        </div>
      </main>
    </div>
  );
};
// ------------------ Export ------------------
export default MobileMenu;

// ------------------ PropTypes ------------------

LayoutEditor.propTypes = {
  categoryData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
  isLoggedIn: PropTypes.bool,
};

MobileMenu.propTypes = {
  open: bool.isRequired,
  className: PropTypes.string,
  setOpen: func,
  isLoggedIn: bool,
  categoryData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
};
