import { useQuery } from 'react-query';
import { useState } from 'react';
import { NumberOfAdsChart } from '@inc/charts';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const AvgGraphs = () => {
  const supabase = useSupabaseClient();
  let data1 = [];

  const fetchMonthClicks = async () => supabase.rpc('get_months_clicks');

  const { data, isFetching } = useQuery('MonthsClicksGraph', fetchMonthClicks);
  if (data) {
    // console.log(data);
    data1 = data.data;
  }

  return <NumberOfAdsChart dataset={data1} />;
};

export default AvgGraphs;
