import RegisteredCompaniesTable from '../../components/Tables/RegisteredCompaniesTable';
import pic from '../../public/siwma-logo-sm.png';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import FileUpload from '../../components/FileUpload';
import NavBar from '../../components/NavBar';

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
 * 1. Import Xavier's Bulk Invite components
 * 2. Fix overflow problem
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
const Page = () => (
  <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
    <NavBar />
    <div className="flex mb-4 gap-4">
      <div className="flex flex-row w-full border-solid border-2 border-gray h-full">
        <FileUpload className="h-full col-span-4" />
      </div>
      <div className="w-2/3 w-full h-full max-w-fit max-h-fit flex flex-row">
        <RegisteredCompaniesTable data={registeredCompaniesData} className="shadow-lg" />
      </div>
    </div>
  </div>
);

Page.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

export default Page;
