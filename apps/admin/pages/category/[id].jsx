import { QueryClientProvider, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import ArrowL from '../../components/ArrowL';
import ArrowR from '../../components/ArrowR';
import CreateParam from '../../components/CreateParam';
import EditCat from '../../components/EditCat';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import NavBar from '../../components/NavBar';
import ActiveParametersTable from '../../components/Tables/ActiveParametersTable';
import AvailableParametersTable from '../../components/Tables/AvailableParametersTable';

const queryClient = new QueryClient();

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full p-8 gap-8 overflow-auto xl:max-h-screen">
        <NavBar />
        <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden pb-4 pt-4">
          <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
            <EditCat />
          </div>
          <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
            <CreateParam />
          </div>
        </div>
        <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden items-center">
          <ActiveParametersTable id={id} />
          <div className="flex flex-col">
            <ArrowR />
            <br />
            <ArrowL />
          </div>

          <AvailableParametersTable id={id} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

/**
 * Use the layout for Admin Pages
 */
CategoryPage.getLayout = (page) => <AdminPageLayout pageName="Invites">{page}</AdminPageLayout>;

export default CategoryPage;