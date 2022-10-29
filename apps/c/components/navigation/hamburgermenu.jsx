import { useState } from 'react';
import { bool, func, objectOf, string } from 'prop-types';
import { useRouter } from 'next/router';

const HamburgerButtonIcon = ({ open, setOpen }) => {
  // ------------------ Styles -----------------
  // border color doesn't show up
  const style = {
    borderColor: 'gray',
  };

  // ------------------ UseStates -----------------
  const [realState, setRealState] = useState(open);

  // ------------------ Handles -----------------
  const onClickHandle = () => {
    setOpen(!realState);
    setRealState(!realState);
  };
  const onHoverHandle = () => {
    setOpen(true);
  };
  const onLeaveHandle = () => {
    setOpen(realState);
  };

  // ------------------ Return -----------------
  return (
    <div style={style}>
      <button
        className="btn"
        onClick={onClickHandle}
        onMouseEnter={onHoverHandle}
        onMouseLeave={onLeaveHandle}
      >
        Hamburger
      </button>
    </div>
  );
};
// ------------------ PropTypes ------------------

HamburgerButtonIcon.propTypes = {
  open: bool,
  setOpen: func,
};

const HamburgerMenuItem = ({ name, link }) => {
  const router = useRouter();

  // ------------------ UseStates -----------------
  const [hover, setHover] = useState(false);

  // ------------------ Styles -----------------
  const style = {
    backgroundColor: hover ? 'blue' : 'white',
    width: '12em',
  };

  // ------------------ Handles -----------------
  const onClickHandle = async () => {
    await router.push(link);
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
  link: string,
};

const ExpandedHamburgerMenu = ({ navigationTabs, open }) => {
  // try to implement a way to close the menu when clicking outside it

  // ------------------ Styles -----------------
  const style = {
    position: 'absolute',
    backgroundColor: 'red',
    width: '12em',
    listStyle: 'none',
    display: open ? 'block' : 'none',
  };

  // ------------------ Mapping -----------------
  const content = Object.keys(navigationTabs).map((name) => {
    const link = navigationTabs[name];
    return <HamburgerMenuItem name={name} link={link} />;
  });

  // ------------------ Return -----------------
  return (
    <div style={style}>
      <ul>{content}</ul>
    </div>
  );
};

// ------------------ PropTypes ------------------

ExpandedHamburgerMenu.propTypes = {
  navigationTabs: objectOf(string),
  open: bool,
};

// The purpose of using NextJS is to keep component related logic within 1 file ~kar lok
// Rip my OCD

// ------------------ Main Component -----------------
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
