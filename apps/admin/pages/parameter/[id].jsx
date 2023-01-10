import { QueryClientProvider, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import Arrows from '../../components/Arrows';
import EditParam from '../../components/EditParam';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import NavBar from '../../components/NavBar';
import DataContext from '../../DataContext';

const queryClient = new QueryClient();

const ParameterPage = () => {
  const [paramIds, setParamIds] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [selectedAvailParam, setSelectedAvailParam] = useState([]);
  const [selectedActiveParam, setSelectedActiveParam] = useState([]);

  const value = useMemo(
    () => ({
      paramIds,
      setParamIds,
      options,
      setOptions,
      selectedAvailParam,
      setSelectedAvailParam,
      selectedActiveParam,
      setSelectedActiveParam,
    }),
    [paramIds, options, selectedAvailParam, selectedActiveParam]
  );
  const router = useRouter();
  const { id } = router.query;

  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={value}>
        <div className="w-full p-8 gap-8 overflow-auto xl:max-h-screen">
          <NavBar />
          <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden pb-4 pt-4">
            <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
              <EditParam id={id} />
            </div>
            {/* <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
              <CreateParam />
            </div> */}
          </div>
        </div>
      </DataContext.Provider>
    </QueryClientProvider>
  );
};

/**
 * Use the layout for Admin Pages
 */
ParameterPage.getLayout = (page) => <AdminPageLayout pageName="Parameter">{page}</AdminPageLayout>;

export default ParameterPage;
