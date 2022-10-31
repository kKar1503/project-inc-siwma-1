import { useState } from 'react';
import { node, string } from 'prop-types';
import { useRouter } from 'next/router';

// ------------------ Layout Configuration ------------------

/**
 * The Icon that is used to open the HamburgerMenu
 * @param open {boolean} - if the menu is open or not
 * @param setOpen {(boolean) => void} - function to set the open state
 * @returns {JSX.Element} - the hamburger button
 * @constructor - the hamburger button
 */
const HamburgerButtonIcon = ({ open, setOpen }) => {
  // ------------------ UseStates -----------------
  const [hover, setHover] = useState(false);

  // ------------------ Handles -----------------
  const onClickHandle = () => {
    setOpen(!open);
  };
  const onHoverHandle = () => {
    setHover(true);
  };
  const onLeaveHandle = () => {
    setHover(false);
  };
  // ------------------ Styles -----------------
  const style = {
    backgroundColor: hover ? IconBackgroundHoverColor : IconBackgroundColor,
    zIndex: 2,
  };

  // ------------------ Return -----------------
  return (
    <div>
      <button
        className="btn"
        onClick={onClickHandle}
        onMouseEnter={onHoverHandle}
        onMouseLeave={onLeaveHandle}
        style={style}
      >
        <svg
          height={32}
          width={32}
          style={{
            fill: hover ? IconHoverColor : IconColor,
          }}
        >
          <path d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4zm24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4zm0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4z" />
        </svg>
      </button>
    </div>
  );
};
// ------------------ PropTypes ------------------

HamburgerButtonIcon.propTypes = {
  open: bool,
  setOpen: func,
};

/**
 * The Item represents each tab in the HamburgerMenu
 * @param name {string} - the name of the tab
 * @param redirectLink {string} - the link of the tab
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
 * @param navigationTabs {object} - the tabs that are shown in the menu
 * @param open {boolean} - if the menu is open or not
 * @returns {JSX.Element} - the menu
 * @constructor - the menu
 */
const ExpandedHamburgerMenu = ({ navigationTabs, open }) => {
  // todo:
  // implement a way to close the menu when clicking outside it
  // implement opening and closing animations

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

HamburgerMenu.propTypes = {
  navigationTabs: objectOf(string),
};

// ------------------ Export ------------------
export default HamburgerMenu;
