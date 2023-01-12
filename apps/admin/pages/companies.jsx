import Link from 'next/link';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import RegisteredCompaniesTable from '../components/Tables/RegisteredCompaniesTable';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import CompanyRegister from '../components/Modals/CompanyRegister';

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
  // -- States -- //
  const [isOpen, setIsOpen] = useState(false);

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const refreshQuery = () => {
    // Invalidate table queries to cause a refetch
    queryClient.invalidateQueries({ queryKey: ['getCompanyCount'] });
    queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });
  };

  return (
    <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
      {/* The company register modal will be teleported to the end of the DOM because it uses React Portals */}
      <CompanyRegister isOpen={isOpen} onRequestClose={closeModal} onSuccess={refreshQuery} />
      <NavBar />

      <div className="flex flex-row gap-6">
        <div className="mb-4 gap-4 flex-1">
          <div className="rounded-xl shadow-lg p-4 bg-base-100">
            <div className="pb-3">
              <h3 className="text-lg font-bold">Register an individual company</h3>
              <p className="text-sm">Register a company profile to the system</p>
            </div>
            <button className="btn w-full btn-outline btn-primary" onClick={openModal}>
              Register Company
            </button>
          </div>
        </div>
        <div className="mb-4 gap-4 flex-1">
          <div className="rounded-xl shadow-lg p-4 bg-base-100">
            <div className="pb-3">
              <h3 className="text-lg font-bold">Bulk Register Companies</h3>
              <p className="text-sm">Register a company profile to the system</p>
            </div>
            <Link href="invite/" className="w-full btn btn-outline btn-primary">
              Bulk Register Companies
            </Link>
          </div>
        </div>
      </div>
      <div className="flex h-full mb-4 gap-4 xl:overflow-hidden shadow-lg bg-base-100">
        <div className="w-full h-full flex flex-row">
          <RegisteredCompaniesTable />
        </div>
      </div>
    </div>
  );
};

// -- Configure AuthGuard -- //
Page.allowAuthenticated = true;
Page.roles = ['admin'];
// Page.aclAbilities = [['View', 'Users']];

Page.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

export default Page;
