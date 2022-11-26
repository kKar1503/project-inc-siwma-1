// ------------------ Imports ------------------

import { bool, func } from 'prop-types';
import { MdHome, MdBookmark, MdChat, MdPeople } from 'react-icons/md';
import cx from 'classnames';
import SidebarHeaderIcon from './MobileMenuSubComponents/SidebarHeader';
import SidebarDivider from './MobileMenuSubComponents/SidebarDivider';
import SidebarItem from './MobileMenuSubComponents/SidebarItem';
import SidebarSubItem from './MobileMenuSubComponents/SidebarSubItem';
import SidebarLogout from './MobileMenuSubComponents/SidebarLogout';
import SidebarSearch from './MobileMenuSubComponents/SidebarSearch';

// ------------------ Layout Configuration ------------------

/**
 * This component is a central location to customize the HamburgerMenu
 * @type {React.FC<import('prop-types').InferProps<typeof LayoutEditor.propTypes>>}
 */
const LayoutEditor = ({ closeHandle }) => (
  <>
    <SidebarHeaderIcon closeHandle={closeHandle} />

    <SidebarDivider />

    <SidebarSearch />
    <SidebarItem name="Home" redirectLink="/test#home" customIcon={<MdHome />} />
    <SidebarItem name="Bookmark" redirectLink="/test#bookmark" customIcon={<MdBookmark />} />
    <SidebarItem name="Chat" redirectLink="/test#chat" customIcon={<MdChat />}>
      <SidebarSubItem name="Social" redirectLink="/test#chat_socials" customIcon={<MdPeople />} />
      <SidebarSubItem name="Personal" redirectLink="/test#chat_personal" />
      <SidebarSubItem name="Friends" redirectLink="/test#chat_friends" />
    </SidebarItem>

    <SidebarDivider />

    <SidebarLogout />
  </>
);

// ------------------ Main Component -----------------
/**
 * The MobileMenu is a hamburger menu only visible on mobile devices
 * @type {React.FC<import('prop-types').InferProps<typeof HamburgerMenu.propTypes>>}
 */
const MobileMenu = ({ open, setOpen }) => {
  // ------------------ Handles -----------------
  const closeHandle = () => setOpen(false);

  // ------------------ Return -----------------
  return (
    <div className={cx('drawer-side block', { hidden: !open })}>
      <main>
        <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer">
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
        </span>
        {/* todo background color here */}
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-auto overflow-y-auto text-center bg-base-content">
          <LayoutEditor closeHandle={closeHandle} />
        </div>
      </main>
    </div>
  );
};
// ------------------ Export ------------------
export default MobileMenu;

// ------------------ PropTypes ------------------

LayoutEditor.propTypes = {
  closeHandle: func,
};

MobileMenu.propTypes = {
  open: bool.isRequired,
  setOpen: func,
};