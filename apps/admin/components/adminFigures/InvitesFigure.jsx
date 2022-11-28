import { FaRegEnvelope } from 'react-icons/fa';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import AdminFigure from './AdminFigure';

const InvitesFigure = () => {
  const supabase = useSupabaseClient();

  const inviteCountQuery = useQuery({
    queryKey: ['getInviteCount'],
    queryFn: async () => supabase.from('invite').select('*', { count: 'exact', head: true }),
    keepPreviousData: true,
    refetchInterval: 300000,
  });

  const { isLoading } = inviteCountQuery;

  const inviteCount = isLoading ? 0 : inviteCountQuery.data.count;

  return (
    <AdminFigure
      title="Pending Invites"
      value={inviteCount}
      color="text-warning"
      icon={<FaRegEnvelope size={144} color="#facc15" />}
    />
  );
};

export default InvitesFigure;
