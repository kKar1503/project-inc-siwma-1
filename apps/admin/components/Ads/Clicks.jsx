import { useQuery } from 'react-query';

import { TbHandClick } from 'react-icons/tb';
import supabase from '../../supabase';

const Clicks = () => {
  // update this sql
  const fetchClicks = async () => supabase.from('Advertisement').select('id');

  const { data, isFetching } = useQuery('a', fetchClicks);
  if (data) {
    console.log(data);
  }
  return (
    <>
      <div className="flex flex-col">
        <p className="text-green-500 font-bold text-6xl ">{isFetching || data.data.length}</p>
        <p>Total clicks</p>
      </div>
      <TbHandClick fontSize={80} style={{ color: '#34D399' }} />
    </>
  );
};

export default Clicks;
