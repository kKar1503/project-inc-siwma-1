// ------------------ Imports ------------------
import { MdSearch } from 'react-icons/md';

/**
 * The Sidebar search is a search bar that is displayed in the sidebar
 * @type {React.FC<import('prop-types').InferProps<typeof SidebarSearch.propTypes>>}
 */
const SidebarSearch = () => (
  <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
    <i className="bi bi-search text-sm" />
    <input
      type="text"
      placeholder="Search"
      className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
    />
    <MdSearch />
  </div>
);

SidebarSearch.propTypes = {};

export default SidebarSearch;
