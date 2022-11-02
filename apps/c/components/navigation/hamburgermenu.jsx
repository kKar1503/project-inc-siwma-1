// ------------------ Imports ------------------

import { useState } from 'react';
import { bool, func, node, string } from 'prop-types';
import { useRouter } from 'next/router';

// ------------------ Layout Configuration ------------------

/**
 * The Icon that is used to open the HamburgerMenu
 * @param open {boolean} - if the menu is open or not
 * @param setOpen {(boolean) => void} - function to set the open state
 * @returns {JSX.Element} - the hamburger button
 * @constructor - the hamburger button
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
 * @param redirectLink {string} - the link of the tab
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
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        {customIcon && <customIcon />}
        <span className="text-[15px] ml-4 text-gray-200 font-bold">{name}</span>
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
      <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">{name}</h1>
    </div>
  );
};

/**
 * The ExpandedHamburgerMenu is the menu that is shown when the HamburgerButtonIcon is clicked
 * @param navigationTabs {object} - the tabs that are shown in the menu
 * @param open {boolean} - if the menu is open or not
 * @returns {JSX.Element} - the menu
 * @constructor - the menu
 */
const SidebarHeaderIcon = ({ closeHandle }) => (
  <div className="text-gray-100 text-xl">
    <div className="p-2.5 mt-1 flex items-center">
      <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600" />
      <h1 className="font-bold text-gray-200 text-[15px] ml-3">S I W M A</h1>
      <i className="bi bi-x cursor-pointer ml-28 lg:hidden" />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <div role="presentation" onClick={closeHandle}>
        X
      </div>
    </div>
  </div>
);

  // ------------------ UseStats -----------------
  const [width, setWidth] = useState(0);

  // ------------------ Styles -----------------
  const style = {
    position: 'absolute',
    backgroundColor: MenuBackgroundColor,
    width: '100%',
    transition: 'all 0.5s ease',
    marginTop: open ? '0em' : '-7em',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-around',
  };

  // ------------------ Mapping -----------------
  const keys = Object.keys(navigationTabs);

  // ------------------ UseEffect -----------------
  useEffect(() => {
    setWidth(window.innerWidth / keys.length);
  }, [keys]);

  const content = keys.map((name) => {
    const redirectLink = navigationTabs[name];
    return <HamburgerMenuItem key={name} name={name} redirectLink={redirectLink} width={width} />;
  });

  // ------------------ Return -----------------
  return <div style={style}>{content}</div>;
};

// ------------------ PropTypes ------------------

ExpandedHamburgerMenu.propTypes = {
  navigationTabs: objectOf(string),
  open: bool,
};

// The purpose of using NextJS is to keep component related logic within 1 file ~ kar lok
// Rip my OCD

// ------------------ Main Component -----------------
/**
 * The HamburgerMenu is a hamburger menu
 * @param navigationTabs {Object.<string, string>} - the tabs that are shown in the menu
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
      <body>
        <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer">
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
        </span>
        {/* todo background color here */}
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
          <LayoutEditor closeHandle={closeHandle} />
        </div>
      </body>
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
