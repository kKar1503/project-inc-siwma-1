import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import CompanyProfilesPreviewTable from '../components/Tables/CompanyProfilesPreviewTable';

// Initialise react-query
const queryClient = new QueryClient();

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
 * 1. Implement real data from react-tables and database
 * 2. Bulk invites to be moved to redirect
 */

/**
 * @type {import("next").NextPage}
 */
const Page = () => {
  const [companyTableData, setCompanyTableData] = useState([]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
        {/* The company register modal will be teleported to the end of the DOM because it uses React Portals */}
        <NavBar />
        <div className="flex mb-4 gap-4 xl:overflow-hidden shadow-lg bg-base-100">
          <div className="w-full h-full flex flex-row">
            <CompanyProfilesPreviewTable data={companyTableData} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

Page.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

export default Page;
