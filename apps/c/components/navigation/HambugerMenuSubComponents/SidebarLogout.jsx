// ------------------ Imports ------------------

/**
 * The sidebar logout is a logout button that is displayed in the sidebar
 * todo no logout functionality yet
 * @type {React.FC<import('prop-types').InferProps<typeof SidebarLogout.propTypes>>}
 */
const SidebarLogout = () => (
  <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-focus text-white">
    <i className="bi bi-box-arrow-in-right" />
    <span className="text-base ml-4 text-base-200 font-bold">Logout</span>
  </div>
);

SidebarLogout.propTypes = {};

export default SidebarLogout;
