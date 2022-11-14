// ------------------ Imports ------------------

import { useState } from 'react';
import { bool, func, node, string } from 'prop-types';
import { useRouter } from 'next/router';

// ------------------ Layout Configuration ------------------

/**
 * This component is a central location to customize the HamburgerMenu
 * @constructor
 */
const LayoutEditor = ({ closeHandle }) => (
  <>
    <SidebarHeaderIcon closeHandle={closeHandle} />

    <SidebarDivider />

    <SidebarSearch />
    <SidebarItem
      name="Home"
      redirectLink="/test#home"
      customIcon={<i className="bi bi-house-door-fill" />}
    />
    <SidebarItem
      name="Bookmark"
      redirectLink="/test#bookmark"
      customIcon={<i className="bi bi-bookmark-fill" />}
    />
    <SidebarItem
      name="Chat"
      redirectLink="/test#chat"
      customIcon={<i className="bi bi-chat-left-text-fill" />}
    >
      <SidebarSubItem name="Social" redirectLink="/test#chat_socials" />
      <SidebarSubItem name="Personal" redirectLink="/test#chat_personal" />
      <SidebarSubItem name="Friends" redirectLink="/test#chat_friends" />
    </SidebarItem>

    <SidebarDivider />

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
const SidebarDivider = () => <div className="my-4 bg-gray-600 h-[1px]" />;

/**
 * The Item represents each tab in the HamburgerMenu
 * @param name {string} - the name of the tab
 * @param customIcon {JSX.Element} - the icon of the tab
 * @param redirectLink {string} - the link of the tab
 * @param children {JSX.Element} - the children of the tab
 * @returns {JSX.Element} - the item
 * @constructor - the item
 */
const SidebarItem = ({ name, customIcon, redirectLink, children }) => {
  // ------------------ useStates -----------------
  const [open, setOpen] = useState(false);

  // ------------------ Styles -----------------
  const rotateStyles = {
    transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
  };

  const subMenuStyles = {
    display: open ? 'block' : 'none',
  };

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
        {/* add 40 - name number of spaces */}

        {children && (
          <>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <span role="presentation" className="text-sm rotate-180" style={rotateStyles}>
              V
            </span>
          </>
        )}
      </div>
      {children && (
        <div
          className="text-left text-sm mt-2 w-4/5 mx-auto text-base-200 font-bold"
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
const SidebarSubItem = ({ name, customIcon, redirectLink }) => {
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
      <h1 className="cursor-pointer p-2 hover:bg-primary-focus rounded-md mt-1">{name}</h1>
    </div>
  );
};

/**
 * The ExpandedHamburgerMenu is the menu that is shown when the HamburgerButtonIcon is clicked
 * This is the icon that is displayed on the top left of the screen
 * @returns {JSX.Element}
 * @constructor
 */
const SidebarHeaderIcon = ({ closeHandle }) => (
  <div className="text-gray-100 text-xl">
    <div className="p-2.5 mt-1 flex items-center">
      <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-primary-focus" />
      <h1 className="font-bold text-base-200 text-[15px] ml-3">S I W M A</h1>
      <i className="bi bi-x cursor-pointer ml-28 lg:hidden" />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <div role="presentation" onClick={closeHandle}>
        X
      </div>
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
  <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-focus text-white">
    <i className="bi bi-box-arrow-in-right" />
    <span className="text-[15px] ml-4 text-base-200 font-bold">Logout</span>
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
const HamburgerMenu = ({ open, setOpen }) => {
  // ------------------ Handles -----------------
  const closeHandle = () => setOpen(false);

  // ------------------ Styles -----------------
  const Styles = {
    display: open ? 'block' : 'none',
  };

  // ------------------ Return -----------------
  return (
    <div style={Styles}>
      <main>
        <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer">
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
        </span>
        {/* todo background color here */}
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-base-content">
          <LayoutEditor closeHandle={closeHandle} />
        </div>
      </main>
    </div>
  );
};
// ------------------ Export ------------------
export default HamburgerMenu;

// ------------------ PropTypes ------------------

LayoutEditor.propTypes = {
  closeHandle: func,
};

SidebarDivider.propTypes = {};

SidebarItem.propTypes = {
  name: string.isRequired,
  customIcon: node,
  children: node,
  redirectLink: string,
};

SidebarSubItem.propTypes = {
  name: string.isRequired,
  customIcon: node,
  redirectLink: string,
};

SidebarHeaderIcon.propTypes = {
  closeHandle: func,
};

SidebarLogout.propTypes = {};

SidebarSearch.propTypes = {};

HamburgerMenu.propTypes = {
  open: bool.isRequired,
  setOpen: func,
};
