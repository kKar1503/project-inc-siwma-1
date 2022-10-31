import { useEffect, useState } from 'react';
import { bool, func, number, objectOf, string } from 'prop-types';
import { useRouter } from 'next/router';

// todo use color scheme
// todo make the menu close when clicking outside it
// todo make the menu items fill up the empty space
// ------------------ Colors -----------------
const IconBackgroundColor = 'white';
const IconColor = 'black';
const IconHoverColor = 'white';
const IconBackgroundHoverColor = 'grey';

const ElementHoverColor = 'blue';
const ElementDefaultColor = 'grey';

const MenuBackgroundColor = 'red';

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
 * @param width {number} - the width of the tab
 * @returns {JSX.Element} - the item
 * @constructor - the item
 */
const HamburgerMenuItem = ({ name, redirectLink, width }) => {
  const router = useRouter();

  // ------------------ UseStates -----------------
  const [hover, setHover] = useState(false);

  // ------------------ Styles -----------------
  const listItemStyle = {
    backgroundColor: hover ? ElementHoverColor : ElementDefaultColor,
    textAlign: 'center',
    flex: '1 1 0',
    width: `${width}px`,
  };

  const spanStyle = {
    display: 'table-cell',
    verticalAlign: 'middle',
  };

  // ------------------ Handles -----------------
  const onClickHandle = async () => {
    await router.push(redirectLink);
  };
  const onHoverHandle = () => {
    setHover(true);
  };
  const onLeaveHandle = () => {
    setHover(false);
  };

  // ------------------ Return -----------------
  return (
    <span style={spanStyle}>
      <button
        style={listItemStyle}
        className="btn"
        onMouseLeave={onLeaveHandle}
        onMouseEnter={onHoverHandle}
        onClick={onClickHandle}
      >
        {name}
      </button>
    </span>
  );
};

// ------------------ PropTypes ------------------

HamburgerMenuItem.propTypes = {
  name: string,
  redirectLink: string,
  width: number,
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
const HamburgerMenu = ({ navigationTabs }) => {
  // ------------------ useStates -----------------
  const [open, setOpen] = useState(false);

  // ------------------ Return -----------------
  return (
    <div>
      <HamburgerButtonIcon open={open} setOpen={setOpen} />
      <ExpandedHamburgerMenu navigationTabs={navigationTabs} open={open} />
    </div>
  );
};

// ------------------ PropTypes ------------------

HamburgerMenu.propTypes = {
  navigationTabs: objectOf(string),
};

// ------------------ Export ------------------
export default HamburgerMenu;
