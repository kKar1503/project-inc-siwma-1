import { useQuery } from 'react-query';
import { BsMegaphone } from 'react-icons/bs';
import { exact } from 'prop-types';
import supabase from '../../supabase';

const Activeads = () => {
  const fetchAds = async () => supabase.from('advertisements').select('active').eq('active', true);

  const { data, isFetching } = useQuery('activeAd', fetchAds);
  // if (data) {
  //   console.log(data);
  // }
  return (
    <>
      <div className="flex flex-col">
        <p className="text-blue-500 font-bold text-6xl ">{isFetching || data.data.length}</p>
        <p>Active advertisements</p>
      </div>

      <BsMegaphone fontSize={80} className="text-blue-500" />
    </>
  );
};

// .eq('active', true);

export default Activeads;
