import { QueryClientProvider, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import Arrows from '../../components/Arrows';
import CreateParam from '../../components/CreateParam';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import NavBar from '../../components/NavBar';
import ActiveParametersTable from '../../components/Tables/ActiveParametersTable';
import AvailableParametersTable from '../../components/Tables/AvailableParametersTable';
import DataContext from '../../DataContext';
import EditAds from '../../components/EditAds';

const queryClient = new QueryClient();

const CategoryPage = () => {
  const [paramIds, setParamIds] = useState(undefined);
  const [options, setOptions] = useState([]);

  const value = useMemo(
    () => ({ paramIds, setParamIds, options, setOptions }),
    [paramIds, options]
  );
  const router = useRouter();
  const { id } = router.query;
  console.log(id)
  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={value}>
        <div className="w-full p-8 gap-8 overflow-auto xl:max-h-screen">
          <NavBar />
          <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden pb-4 pt-4">
            <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
              <EditAds id={id} />
            </div>
          </div>
        </div>
      </DataContext.Provider>
    </QueryClientProvider>
  );
};

/**
 * Use the layout for Admin Pages
 */
CategoryPage.getLayout = (page) => <AdminPageLayout pageName="Advertisement">{page}</AdminPageLayout>;

export default CategoryPage;
