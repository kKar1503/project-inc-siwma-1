import { useQuery } from 'react-query';
import { useState } from 'react';
import { ClickDistribution } from '@inc/charts';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ClicksGraphs = () => {
  let data1 = [];
  const supabase = useSupabaseClient();
  const fetchClicks = async () => supabase.rpc('get_clicks');

  const { data, isFetching } = useQuery('ClicksGraph', fetchClicks);

  if (data) {
    console.log(data);
    data1 = data.data;
  }

  return <ClickDistribution dataset={data1} />;
};

export default ClicksGraphs;
