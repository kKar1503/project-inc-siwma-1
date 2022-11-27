import { QueryClientProvider, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Arrows from '../../components/Arrows';
import CreateParam from '../../components/CreateParam';
import EditCat from '../../components/EditCat';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import NavBar from '../../components/NavBar';
import ActiveParametersTable from '../../components/Tables/ActiveParametersTable';
import AvailableParametersTable from '../../components/Tables/AvailableParametersTable';

const queryClient = new QueryClient();

const CategoryPage = () => {
  const [optionData, setOptionData] = useState();

  const router = useRouter();
  const { id } = router.query;
  const paramId = (data) => {
    if (data !== undefined) {
      setOptionData(data);
    } else {
      setOptionData(undefined);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full p-8 gap-8 overflow-auto xl:max-h-screen">
        <NavBar />
        <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden pb-4 pt-4">
          <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
            <EditCat id={id} />
          </div>
          <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
            <CreateParam />
          </div>
        </div>
        <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden items-center">
          <ActiveParametersTable id={id} paramId={paramId} optionData={optionData} />
          <div className="flex flex-col">
            <Arrows id={id} optionData={optionData} paramId={paramId} />
          </div>
          <AvailableParametersTable id={id} paramId={paramId} optionData={optionData} />
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
