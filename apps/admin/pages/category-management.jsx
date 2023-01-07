import Link from 'next/link';
import { useState } from 'react';
import { QueryClient } from 'react-query';
import ExistingCategories from '../components/Tables/ExistingCategories';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import CategoryAdd from '../components/Modals/CategoryAdd';

// Initialise react-query
const queryClient = new QueryClient();

/**
 * @type {import("next").NextPage}
 */
const Page = () => {
  // -- States -- //
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const refreshQuery = () => {
    // Invalidate table queries to cause a refetch
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    queryClient.invalidateQueries({ queryKey: ['getCategoryCount'] });
  };
  return (
    <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
      {/* The company register modal will be teleported to the end of the DOM because it uses React Portals */}
      <CategoryAdd isOpen={isOpen} onRequestClose={closeModal} onSuccess={refreshQuery} />
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
      <div className="flex mb-4 gap-4 xl:overflow-hidden shadow-lg bg-base-100">
        <div className="w-full h-full flex flex-row">
          <ExistingCategories />
        </div>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <AdminPageLayout pageName="Categories">{page}</AdminPageLayout>;

export default Page;
