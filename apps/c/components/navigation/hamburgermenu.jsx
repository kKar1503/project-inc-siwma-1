import { useState } from 'react';
import { bool, func, objectOf, string } from 'prop-types';
import { useRouter } from 'next/router';

// todo use color scheme
// ------------------ Colors -----------------
const IconBackgroundColor = 'white';
const IconColor = 'black';

const ElementHoverColor = 'blue';
const ElementDefaultColor = 'white';

const MenuBackgroundColor = 'red';

/**
 * The Icon that is used to open the HamburgerMenu
 * @param open {boolean} - if the menu is open or not
 * @param setOpen {(boolean) => void} - function to set the open state
 * @returns {JSX.Element} - the hamburger button
 * @constructor - the hamburger button
 */
const HamburgerButtonIcon = ({ open, setOpen }) => {
  // ------------------ Styles -----------------
  // border color doesn't show up
  const style = {
    backgroundColor: IconBackgroundColor,
  };

  // ------------------ Handles -----------------
  const onClickHandle = () => {
    setOpen(!open);
  };

  // ------------------ Return -----------------
  return (
    <div>
      <button className="btn" onClick={onClickHandle} style={style}>
        <svg
          height={32}
          width={32}
          style={{
            fill: IconColor,
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
const HamburgerMenuItem = ({ name, redirectLink }) => {
  const router = useRouter();

  // ------------------ UseStates -----------------
  const [hover, setHover] = useState(false);

  // ------------------ Styles -----------------
  const style = {
    backgroundColor: hover ? ElementHoverColor : ElementDefaultColor,
    width: '12em',
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
    <li style={{ margin: '5px' }}>
      <button
        style={style}
        className="btn"
        onMouseLeave={onLeaveHandle}
        onMouseEnter={onHoverHandle}
        onClick={onClickHandle}
      >
        {name}
      </button>
    </li>
  );
};

// ------------------ PropTypes ------------------

HamburgerMenuItem.propTypes = {
  name: string,
  redirectLink: string,
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

  // ------------------ Styles -----------------
  const style = {
    position: 'absolute',
    backgroundColor: MenuBackgroundColor,
    width: '12em',
    transition: 'all 0.5s ease',
    marginLeft: open ? '-0.5em' : '-13em',
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0',
  };

  // ------------------ Mapping -----------------
  const content = Object.keys(navigationTabs).map((name) => {
    const redirectLink = navigationTabs[name];
    return <HamburgerMenuItem key={name} name={name} redirectLink={redirectLink} />;
  });

  // ------------------ Return -----------------
  return (
    <div style={style}>
      <ul style={listStyle}>{content}</ul>
    </div>
  );
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
