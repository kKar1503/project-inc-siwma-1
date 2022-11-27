import { useQuery } from 'react-query';
import { useState } from 'react';
import { ClickDistribution } from '@inc/charts';
import supabase from '../../supabase';

const ClicksGraphs = () => {
  const [count, setCount] = useState(0);

  let data1 = [
    { clicks: 5, name: 'SHI LI FANG IRON...' },
    { clicks: 15, name: 'SHI LI FANG IRON...' },
    { clicks: 15, name: 'SHI LI FANG IRON...' },
    { clicks: 5, name: 'SHI LI FANG IRON...' },
    { clicks: 10, name: 'SHI LI FANG IRON...' },
  ];

  const fetchClicks = async () => supabase.rpc('get_clicks');

  const { data, isFetching } = useQuery('ClicksGraph', fetchClicks);
  // const sum = () => {
  //   let total = 0 ;
  //   for (let i = 0 ; i < data.data.length; i++) {
  //     total += data.data[i].clicks;
  //   }
  //   return total;
  // }

  if (data) {
    console.log(data);
    data1 = data.data;
  }

  return <ClickDistribution dataset={data1} total={8} />;
};

export default ClicksGraphs;
