// ------------------ Imports ------------------

import PropTypes, {bool, func} from 'prop-types';
import {MdChat, MdDashboard, MdLogout, MdHome, MdLogin,MdAdd} from 'react-icons/md';
import cx from 'classnames';
import SidebarDivider from './MobileMenuSubComponents/SidebarDivider';
import SidebarItem from './MobileMenuSubComponents/SidebarItem';
import SidebarSubItem from './MobileMenuSubComponents/SidebarSubItem';
import SidebarDropdown from './MobileMenuSubComponents/SidebarDropdown';

// ------------------ Layout Configuration ------------------

/**
 * This component is a central location to customize the HamburgerMenu
 */
const LayoutEditor = ({categoryData, isLoggedIn}) => (
  <>
    {/* eslint-disable-next-line no-alert */}
    {/* <SidebarSearch/> */}
    {/* <SidebarDivider/> */}
    <SidebarItem name="Home" redirectLink="/"><MdHome/></SidebarItem>
    <SidebarDropdown name="Categories" customIcon={<MdDashboard/>}>
      {categoryData?.map(({name, id}) => (
        <SidebarSubItem
          name={name}
          redirectLink={`/category/${id}`}
          key={name}
        />
      ))}
    </SidebarDropdown>


    <SidebarItem name="Chat" redirectLink="/real-time-chat"><MdChat/></SidebarItem>

    <SidebarDivider/>

    <SidebarItem name="New Listing" redirectLink="/new-listing"><MdAdd/></SidebarItem>

    <SidebarDivider/>

    {isLoggedIn ? <SidebarItem name="Logout" redirectLink="/logout"><MdLogout/></SidebarItem>
      : <SidebarItem name="Login" redirectLink="/login"><MdLogin/></SidebarItem>}
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
      className={cx(className, `h1 z-40 absolute my-4 shadow-xl bg-base-100 rounded-box border-2 `, {hidden: !open})}>
      <main>
        <div
          className="p-2 text-center bg-base-100">
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
