import { FaUserCheck } from 'react-icons/fa';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import AdminFigure from './AdminFigure';

const UsersFigure = () => {
  const supabase = useSupabaseClient();

  const userCountQuery = useQuery({
    queryKey: ['getUserCount'],
    queryFn: async () => supabase.from('users').select('*', { count: 'exact', head: true }),
    keepPreviousData: true,
    refetchInterval: 300000,
  });

  const { isLoading } = userCountQuery;

  const userCount = isLoading ? 0 : userCountQuery.data.count;

  return (
    <AdminFigure
      title="Total Users"
      value={userCount.toString()}
      color="text-accent"
      icon={<FaUserCheck size={144} color="#34d399" />}
    />
  );
};

export default UsersFigure;
