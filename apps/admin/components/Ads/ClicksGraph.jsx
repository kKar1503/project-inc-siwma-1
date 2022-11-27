import { useQuery } from 'react-query';
import { useState } from 'react';
import { ClickDistribution } from '@inc/charts';
import supabase from '../../supabase';

const ClicksGraphs = () => {
  // const [count, setCount] = useState(0);

  let data1 = [
    { clicks: 5, name: 'SHI LI FANG IRON...' },
    { clicks: 15, name: 'SHI LI FANG IRON...' },
    { clicks: 15, name: 'SHI LI FANG IRON...' },
    { clicks: 5, name: 'SHI LI FANG IRON...' },
    { clicks: 10, name: 'SHI LI FANG IRON...' },
  ];

  const fetchClicks = async () => supabase.rpc('get_clicks');

  const { data, isFetching } = useQuery('ClicksGraph', fetchClicks);
  if (data) {
    data1 = data.data;
  }

  return <ClickDistribution dataset={data1} />;
};

export default ClicksGraphs;