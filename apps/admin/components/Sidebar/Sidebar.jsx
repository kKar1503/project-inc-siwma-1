import Image from 'next/image';
import PropTypes from 'prop-types';
import { lazyReference } from '@inc/utils';
import SidebarItem, { parseSidebarItem } from './SidebarItem';

/**
 * Navigation list for admin sidebars
 */
export const adminSidebar = [
  {
    'Home Page': '/',
  },
  {
    'Data Analytics': '/Analytics',
  },
  {
    Advertisement: '/AdvertisementDashboard',
  },
  {
    'User Management': [
      {
        Overview: '/overview',
      },
      {
        Companies: '/companies',
      },
      {
        Users: '/users',
      },
      {
        Invites: '/invite',
      },
    ],
  },
  {
    Category: '/category_management',
  },
  // add { Category: '/category_management' }, thanks
];

/**
 * Sidebar for admin pages
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const Sidebar = ({ children, sidebarList, selected }) => (
  <div className="drawer drawer-mobile">
    <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">{children}</div>
    <div className="drawer-side lg:rounded-2xl shadow-xl">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="sidebar-drawer" className="drawer-overlay" />
      <ul className="menu p-4 overflow-y-visible w-64 bg-base-100 text-base-content flex-nowrap">
        <li className="flex-none w-full h-16 btn-disabled bg-base-100 my-5">
          <div className="inline-block">
            <Image src="/siwma-logo-sm.png" className="object-contain" alt="SIWMA Logo" fill />
          </div>
        </li>
        <hr className="my-4" />
        {sidebarList.map((sidebarItem) => {
          // Parses the subpage
          const parsedItem = parseSidebarItem(sidebarItem);

          // Render the sidebar item
          return (
            <SidebarItem
              key={parsedItem.label}
              label={parsedItem.label}
              link={parsedItem.link}
              subPages={parsedItem.subPages}
              selected={selected}
            />
          );
        })}
      </ul>
    </div>
  </div>
);

/**
 * Recursive proptype definitions
 * https://stackoverflow.com/a/32092829
 */
// eslint-disable-next-line no-use-before-define
const lazySidebarListType = lazyReference(() => sidebarListType);

const sidebarListType = PropTypes.oneOfType([
  PropTypes.objectOf(PropTypes.string),
  PropTypes.objectOf(PropTypes.arrayOf(lazySidebarListType)),
]);

const propTypes = {
  children: PropTypes.node,
  sidebarList: PropTypes.arrayOf(sidebarListType).isRequired,
  selected: PropTypes.string,
};

Sidebar.propTypes = propTypes;

export default Sidebar;
