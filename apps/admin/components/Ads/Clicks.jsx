import { useQuery } from 'react-query';

import { TbHandClick } from 'react-icons/tb';
import supabase from '../../supabase';

const Clicks = () => {
  const fetchClicks = async () => supabase.from('advertisements').select('clicks (id)');
  const fetchAdv = async () => supabase.from('clicks').select('id');

  const { data, isFetching } = useQuery('getClicks', fetchClicks);
  const count = () => {
    let sum = 0;
    for (let i = 0; i < data.data.length; i++) {
      sum += data.data[i].clicks.length;
    }
    return sum;
  };
  if (data) {
    // console.log(data.data);
  }
  return (
    <>
      <div className="flex flex-col">
        <p className="text-green-500 font-bold text-6xl ">
          {isFetching || (count() / data.data.length).toFixed()}
        </p>
        <p>Average clicks</p>
      </div>
      <TbHandClick fontSize={80} className="text-green-500" />
    </>
  );
};

export default Clicks;
