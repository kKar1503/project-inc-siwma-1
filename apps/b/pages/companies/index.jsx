import Sidebar, { adminSidebar } from '../../components/Sidebar/Sidebar';

/**
 * The below is for rendering the Companies Management Page
 * This page contains 2 features:
 * 1: Register a company
 * 1a. Register an individual company
 *    -> This is designed to be used for the registration of non-SIMWA
 *       SME companies outside of the initial registration process
 *       Note: By default, companies created here are *not* visible
 * 1b. Bulk Registration (Excel file upload)
 *    -> This is used for creating multiple *visible* companies at once
 *
 * 2: View registered companies
 *    -> This is used to manage existing companies, including delete
 *       and update operations.
 *
 * TO DO:
 * 1. Actual default layout
 * 2. Import Xavier's Bulk Invite components
 * 3. Import Karandeep's table
 * 4.
 */

/**
 * @type {import("next").NextPage}
 */
const Page = () => (
  <div className="flex mb-4 gap-4">
    <div className="w-1/3 border-solid border-2 border-gray h-full">
      <h1 className="font-bold text-xl">Bulk Register Placeholder</h1>
    </div>
    <div className="w-2/3 h-12">
      <h1 className="font-bold text-xl">Table Placeholder</h1>
    </div>
  </div>
);

Page.getLayout = (page) => (
  <Sidebar sidebarList={adminSidebar} selected="Companies">
    {page}
  </Sidebar>
);

export default Page;
