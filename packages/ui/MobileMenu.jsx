// ------------------ Imports ------------------

import PropTypes, {bool, func} from 'prop-types';
import {MdBookmark, MdChat, MdHome} from 'react-icons/md';
import cx from 'classnames';
import SidebarDivider from './MobileMenuSubComponents/SidebarDivider';
import SidebarItem from './MobileMenuSubComponents/SidebarItem';
import SidebarSubItem from './MobileMenuSubComponents/SidebarSubItem';
import SidebarLogout from './MobileMenuSubComponents/SidebarLogout';
import SidebarSearch from './MobileMenuSubComponents/SidebarSearch';
import SidebarDropdown from './MobileMenuSubComponents/SidebarDropdown';

// ------------------ Layout Configuration ------------------

/**
 * This component is a central location to customize the HamburgerMenu
 * @type {function({categoryData: object})}
 */
const LayoutEditor = ({categoryData}) => (
  <>
    {/* eslint-disable-next-line no-alert */}
    <SidebarSearch/>
    <SidebarDivider/>
    <SidebarItem name="Home" redirectLink="/test#home" customIcon={<MdHome/>}/>
    <SidebarItem name="Bookmark" redirectLink="/test#bookmark" customIcon={<MdBookmark/>}/>
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

    <SidebarLogout/>
  </>
);

// ------------------ Main Component -----------------
/**
 * The MobileMenu is a hamburger menu only visible on mobile devices
 * @type {function({open: bool,className: string, setOpen: function,categoryData: object})}  })}
 */
const MobileMenu = ({open, className, setOpen, categoryData}) => {
  // ------------------ Handles -----------------
  const closeHandle = () => setOpen(false);

  // ------------------ Return -----------------
  return (
    <div className={cx(`block h1${className}`, {hidden: !open})}>
      <main>
        <span className="text-white text-4xl top-5 left-4 cursor-pointer">
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"/>
        </span>
        {/* todo background color here */}
        <div
          className=" fixed top-0 bottom-0 lg:left-0 p-2 w-auto text-center bg-base-content">
          <LayoutEditor closeHandle={closeHandle} categoryData={categoryData}/>
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
};

MobileMenu.propTypes = {
  open: bool.isRequired,
  className: PropTypes.string,
  setOpen: func,
  categoryData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
};
