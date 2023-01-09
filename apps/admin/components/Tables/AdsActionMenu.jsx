import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQueries, useQueryClient, useQuery, useMutation } from 'react-query';
import TableMenu from './TableMenu';
import Link from 'next/link';

const AdsActionMenu = ({ companyid, status }) => {
  // -- Queries Supabase --//
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const setActive = async ({ active, id }) =>
    supabase.from('advertisements').update({ active }).eq('id', id);

  const refresh = {
    onSuccess: () => {
      queryClient.invalidateQueries('ads');
      queryClient.invalidateQueries('activeAd');
    },
  };

  const { mutate } = useMutation(setActive, refresh);
  const test = (i) => {
    console.log(i);
  };
 console.log(`ads${companyid}`)
  
  
  return (
    
    <TableMenu>
      {/* <li>
      <Link href={{ pathname: '/edit-compan', query: { active }}}>
        <SlPencil className="h-5 w-5" />
        Edit
      </Link>
    </li> */}
      <li>
        <button
          className="btn btn-outline btn-primary"
          disabled={status ? 'disabled' : false}
          onClick={() => mutate({ active: !status === true, id: companyid })}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className="btn btn-outline btn-primary"
          disabled={!status ? 'disabled' : false}
          onClick={() => mutate({ active: !status === 'true', id: companyid })}
        >
          Unactive
        </button>
      </li>
      <li>
          <Link className="btn btn-outline btn-primary" href={`/ads/${companyid}`}>
          <button >
            Edit
          </button>
          </Link>
        </li>

        

    </TableMenu>
  );
};


AdsActionMenu.propTypes = {
  companyid: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,

};

export default AdsActionMenu;
