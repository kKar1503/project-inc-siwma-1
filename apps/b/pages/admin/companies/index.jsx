import Link from 'next/link';
import RegisteredCompaniesTable from '../../../components/Tables/RegisteredCompaniesTable';
import pic from '../../../public/siwma-logo-sm.png';
import AdminPageLayout from '../../../components/layouts/AdminPageLayout';
import NavBar from '../../../components/NavBar';
import CompanyRegister from '../../../components/Forms/CompanyRegister';

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
const registeredCompaniesData = [
  {
    id: 1,
    profilePicture: pic,
    company: 'Company',
    website: 'www.company.com',
    bio: 'Company Bio',
  },
  {
    id: 2,
    profilePicture: pic,
    company: 'Very Very Long Company Name',
    website: 'veryverylongname@veryverylongdomain.com',
    bio: 'Very Very Long Company Bio',
  },
  {
    id: 3,
    profilePicture: pic,
    company: 'Very Very Long Company Name',
    website: 'veryverylongname@veryverylongdomain.com',
    bio: 'Very Very Long Company Bio',
  },
  {
    id: 4,
    profilePicture: pic,
    company: 'Very Very Long Company Name',
    website: 'veryverylongname@veryverylongdomain.com',
    bio: 'Very Very Long Company Bio',
  },
  {
    id: 5,
    profilePicture: pic,
    company: 'Very Very Long Company Name',
    website: 'veryverylongname@veryverylongdomain.com',
    bio: 'Very Very Long Company Bio',
  },
  {
    id: 6,
    profilePicture: pic,
    company: 'Very Very Long Company Name',
    website: 'veryverylongname@veryverylongdomain.com',
    bio: 'Very Very Long Company Bio',
  },
  {
    id: 7,
    profilePicture: pic,
    company: 'Very Very Long Company Name',
    website: 'veryverylongname@veryverylongdomain.com',
    bio: 'Very Very Long Company Bio',
  },
  {
    id: 8,
    profilePicture: pic,
    company: 'Very Very Long Company Name',
    website: 'veryverylongname@veryverylongdomain.com',
    bio: 'Very Very Long Company Bio',
  },
];
const Modals = () => (
  <div className="absolute">
    <CompanyRegister />
  </div>
);
const Page = () => (
  <div className="flex flex-col flex-1 w-full p-8 gap-8 xl:max-h-screen">
    <NavBar />

    <div className="flex flex-row gap-6">
      <div className="mb-4 gap-4 flex-1">
        <div className="rounded-xl shadow-lg p-4 bg-base-100">
          <div className="pb-3">
            <h3 className="text-lg font-bold">Register an individual company</h3>
            <p className="text-sm">Register a company profile to the system</p>
          </div>
          <label htmlFor="company-register" className="btn w-full btn-outline btn-primary">
            Register Company
          </label>
        </div>
      </div>
      <div className="mb-4 gap-4 flex-1">
        <div className="rounded-xl shadow-lg p-4 bg-base-100">
          <div className="pb-3">
            <h3 className="text-lg font-bold">Bulk Register Companies</h3>
            <p className="text-sm">Register multiple companies through a file upload</p>
          </div>
          <Link href="/admin/invite" className="w-full btn btn-outline btn-primary">
            Bulk Register Companies
          </Link>
        </div>
      </div>
    </div>
    <div className="flex mb-4 gap-4 xl:overflow-hidden">
      <div className="w-full h-full flex flex-row">
        <RegisteredCompaniesTable data={registeredCompaniesData} className="shadow-lg" />
      </div>
    </div>
  </div>
);

Page.getLayout = (page) => (
  <AdminPageLayout pageName="Companies" siblings={<Modals />}>
    {page}
  </AdminPageLayout>
);

export default Page;
