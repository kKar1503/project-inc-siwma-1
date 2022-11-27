import { useQuery, useMutation, useQueryClient } from 'react-query';
import supabase from '../../supabase';

const Tableads = () => {
  const queryClient = useQueryClient();
  const setActive = async (active, id) =>
    supabase.from('advertisements').update({ active }).eq('id', console.log(id));
  const fetchAds = async () => supabase.rpc('get_active_ads');
  const { data, isFetching } = useQuery('ads', fetchAds);
  const refresh = { onSuccess: () => queryClient.invalidateQueries('ads') };
  const { mutate } = useMutation(setActive, refresh);
  console.log(data);
  return (
    <table className="table table-compact w-full">
      <thead>
        <tr>
          <th>Advertisement</th>
          <th>Company</th>
          <th>Clicks</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {isFetching ||
          data.data.map(({ id, advertisement, email, company, clicks, active }) => (
            <tr key={id}>
              <td>{advertisement.substr(0, 30)}</td>
              <td>{company.substr(0, 20)}</td>
              <td>{clicks}</td>
              <td>{email}</td>
              <th>
                <select
                  className="btn btn-ghost btn-xs"
                  onChange={(e) => mutate(e.target.value === 'true', id)}
                  value={active}
                >
                  <option value="true">active</option>
                  <option value="false">inactive</option>
                </select>
              </th>
            </tr>
          ))}
        <tr className="active">
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default Tableads;
