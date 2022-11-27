import { useQuery } from 'react-query';
import { useState } from 'react';
import { NumberOfAdsChart } from '@inc/charts';
import supabase from '../../supabase';

const AvgGraphs = () => {
  // const [count, setCount] = useState(0);

  let data1 = [
    { month: 'Jan', clicks: 5 },
    { month: 'Feb', clicks: 1 },
    { month: 'Mar', clicks: 2 },
    { month: 'Apr', clicks: 4 },
    { month: 'May', clicks: 4 },
    { month: 'Jun', clicks: 1 },
    { month: 'Jul', clicks: 4 },
    { month: 'Aug', clicks: 1 },
    { month: 'Sep', clicks: 3 },
    { month: 'Oct', clicks: 4 },
    { month: 'Oct', clicks: 4 },
    { month: 'Nov', clicks: 0 },
    { month: 'Dec', clicks: 0 },
  ];

  const fetchMonthClicks = async () => supabase.rpc('get_months_clicks');

  const { data, isFetching } = useQuery('MonthsClicksGraph', fetchMonthClicks);
  if (data) {
    console.log(data);
    data1 = data.data;
  }

  return <NumberOfAdsChart dataset={data1} />;
};

export default AvgGraphs;
