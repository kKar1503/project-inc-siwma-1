// ------------------ Imports ------------------

import { func } from 'prop-types';
import { MdClose } from 'react-icons/md';

/**
 * The ExpandedHamburgerMenu is the menu that is shown when the HamburgerButtonIcon is clicked
 * This is the icon that is displayed on the top left of the screen
 * @type {React.FC<import('prop-types').InferProps<typeof SidebarHeaderIcon.propTypes>>}
 */
const SidebarHeaderIcon = ({ closeHandle }) => (
  <div className="text-gray-100 text-xl">
    <div className="p-2.5 mt-1 flex items-center">
      <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-primary-focus" />
      <h1 className="font-bold text-base-200 text-[15px] ml-3">S I W M A</h1>
      {/* <i className="bi bi-x ml-28 lg:hidden" /> */}
      <div
        className="ml-32 cursor-pointer inset-y-0 right-0"
        role="presentation"
        onClick={closeHandle}
      >
        <MdClose />
      </div>
    </div>
  </div>
);

SidebarHeaderIcon.propTypes = {
  closeHandle: func,
};

export default SidebarHeaderIcon;
