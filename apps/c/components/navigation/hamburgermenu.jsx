import { useState } from 'react';
import { node, string } from 'prop-types';
import { useRouter } from 'next/router';

// ------------------ Layout Configuration ------------------

/**
 * This component is a central location to customize the HamburgerMenu
 * @constructor
 */
const LayoutEditor = () => (
  <>
    <SidebarHeaderIcon />

    <MenuLineDivider />

    <SidebarSearch />
    <MenuItem name="Home" redirectLink="/" customIcon={<i className="bi bi-house-door-fill" />} />
    <MenuItem name="Bookmark" redirectLink="/" customIcon={<i className="bi bi-bookmark-fill" />} />
    <MenuItem
      name="Chat box"
      redirectLink="/"
      customIcon={<i className="bi bi-chat-left-text-fill" />}
    >
      <SubMenuItem name="Social" redirectLink="/" />
      <SubMenuItem name="Personal" redirectLink="/" />
      <SubMenuItem name="Friends" redirectLink="/" />
    </MenuItem>

    <MenuLineDivider />

    <SidebarLogout />
  </>
);

// -----------------------------------------------

/**
 * MenuLineDivider is a line divider that is displayed in the menu
 * This can be used to visually separate items
 * @returns {JSX.Element}
 * @constructor
 */
const MenuLineDivider = () => <div className="my-4 bg-gray-600 h-[1px]" />;

/**
 * The Item represents each tab in the HamburgerMenu
 * @param name {string} - the name of the tab
 * @param customIcon {JSX.Element} - the icon of the tab
 * @param redirectLink {string} - the link of the tab
 * @param children {JSX.Element} - the children of the tab
 * @returns {JSX.Element} - the item
 * @constructor - the item
 */
const MenuItem = ({ name, customIcon, redirectLink, children }) => {
  // ------------------ useStates -----------------
  const [open, setOpen] = useState(false);

  // ------------------ Styles -----------------
  const rotateStyles = {
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
  };

  const subMenuStyles = {
    display: open ? 'block' : 'none',
  };

  // ------------------ Misc -----------------
  const router = useRouter();

  // ------------------ Handles -----------------
  const redirect = () => {
    router.push(redirectLink);
  };

  const toggle = () => {
    setOpen(!open);
  };

  // ------------------ Return -----------------
  return (
    <>
      <div
        onClick={redirect}
        role="presentation"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        {customIcon && <customIcon />}
        <span className="text-[15px] ml-4 text-gray-200 font-bold">{name}</span>
        {children && (
          <span
            onClick={toggle}
            role="presentation"
            className="text-sm rotate-180"
            style={rotateStyles}
          >
            <i className="bi bi-chevron-down" />
          </span>
        )}
      </div>
      {children && (
        <div
          className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
          style={subMenuStyles}
        >
          {children}
        </div>
      )}
    </>
  );
};

/**
 * SubMenuItem is a drawer item that is displayed by a MenuItem
 * @param name {string} - the name of the item
 * @param customIcon {JSX.Element} - the icon that is displayed next to the name
 * @param redirectLink {string} - the link that is redirected to when the item is clicked
 * @returns {JSX.Element}
 * @constructor
 */
const SubMenuItem = ({ name, customIcon, redirectLink }) => {
  // ------------------ Misc -----------------
  const router = useRouter();

  // ------------------ Handles -----------------
  const redirect = () => {
    router.push(redirectLink);
  };

  // ------------------ Return -----------------
  return (
    <div role="presentation" onClick={redirect}>
      {customIcon && <customIcon />}
      <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">{name}</h1>
    </div>
  );
};

/**
 * The ExpandedHamburgerMenu is the menu that is shown when the HamburgerButtonIcon is clicked
 * This is the icon that is displayed on the top left of the screen
 * @returns {JSX.Element}
 * @constructor
 */
const SidebarHeaderIcon = () => (
  <div className="text-gray-100 text-xl">
    <div className="p-2.5 mt-1 flex items-center">
      <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600" />
      <h1 className="font-bold text-gray-200 text-[15px] ml-3">S I W M A</h1>
      <i className="bi bi-x cursor-pointer ml-28 lg:hidden" />
    </div>
  </div>
);

/**
 * The sidebar logout is a logout button that is displayed in the sidebar
 * todo no logout functionality yet
 * @returns {JSX.Element}
 * @constructor
 */
const SidebarLogout = () => (
  <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
    <i className="bi bi-box-arrow-in-right" />
    <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
  </div>
);

/**
 * The Sidebar search is a search bar that is displayed in the sidebar
 * @returns {JSX.Element}
 * @constructor
 */
const SidebarSearch = () => (
  <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
    <i className="bi bi-search text-sm" />
    <input
      type="text"
      placeholder="Search"
      className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
    />
  </div>
);

// The purpose of using NextJS is to keep component related logic within 1 file ~ kar lok
// Rip my OCD

// ------------------ Main Component -----------------
/**
 * The HamburgerMenu is a hamburger menu
 * @returns {JSX.Element}
 * @constructor
 */
const HamburgerMenu = () => (
  // ------------------ useStates -----------------
  // const [open, setOpen] = useState(false);

  // ------------------ Return -----------------
  <div>
    <body className="bg-blue-600">
      <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer">
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
      </span>
      <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
        <LayoutEditor />
      </div>
    </body>
  </div>
);
// ------------------ Export ------------------
export default HamburgerMenu;

// ------------------ PropTypes ------------------

LayoutEditor.propTypes = {};

MenuLineDivider.propTypes = {};

MenuItem.propTypes = {
  name: string.isRequired,
  customIcon: node,
  children: node,
  redirectLink: string,
};

SubMenuItem.propTypes = {
  name: string.required,
  customIcon: node,
  redirectLink: string,
};

SidebarHeaderIcon.propTypes = {};

SidebarLogout.propTypes = {};

SidebarSearch.propTypes = {};

HamburgerMenu.propTypes = {};
