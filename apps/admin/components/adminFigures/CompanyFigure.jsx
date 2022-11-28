import { FaRegBuilding } from 'react-icons/fa';
import { getCompanyCount } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import AdminFigure from './AdminFigure';

const CompanyFigure = () => {
  const supabase = useSupabaseClient();

  const companyCountQuery = useQuery({
    // Fetches the total number of companies from supabase
    queryKey: ['getCompanyCount'],
    keepPreviousData: true,
    refetchInterval: 60000, // Refresh every minute
    queryFn: async () =>
      getCompanyCount({
        supabase,
      }),
  });

  const { isLoading } = companyCountQuery;

  const companyCount = isLoading || !companyCountQuery.data ? 0 : companyCountQuery.data.count;
  return (
    <AdminFigure
      title="Active Companies"
      value={companyCount}
      color="text-primary"
      icon={<FaRegBuilding size={144} color="#2563eb" />}
    />
  );
};

export default CompanyFigure;
