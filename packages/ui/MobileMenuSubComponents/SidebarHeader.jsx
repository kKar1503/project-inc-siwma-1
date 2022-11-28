// ------------------ Imports ------------------
import Image from 'next/image';
import Link from 'next/link';
import { func } from 'prop-types';
import { MdClose } from 'react-icons/md';
import SIWMAIcon from '../public/siwma-logo-icon.png';

/**
 * The ExpandedHamburgerMenu is the menu that is shown when the HamburgerButtonIcon is clicked
 * This is the icon that is displayed on the top left of the screen
 * @type {React.FC<import('prop-types').InferProps<typeof SidebarHeaderIcon.propTypes>>}
 */
const SidebarHeaderIcon = ({ closeHandle }) => (
  <div className="text-gray-100 text-xl">
    <div className="p-2.5 mt-1 flex items-center">
      <Link className="btn btn-ghost" href="http://localhost:3000">
        <Image src={SIWMAIcon} className="h-full w-full object-cover lg:hidden" />
        <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-primary-focus" />
        <h1 className="font-bold text-base-200 text-[15px] ml-3">S I W M A</h1>
      </Link>
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
