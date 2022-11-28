import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  MostPostsChart,
  TopSellingCategoryChart,
  TopBuyingCategoryChart,
  NumberOfBuyAndSellChart,
  MostBuyAndSellChart,
  MostCommonCategoryChart,
  NoData,
} from '@inc/charts';

const LoadChart = ({ chart, rpc, args, limit }) => {
  const supabaseClient = useSupabaseClient();
  const { data, isFetching } = useQuery([rpc, args], () =>
    supabaseClient.rpc(rpc, args).limit(limit)
  );
  return isFetching || (data.data.length ? <chart.type data={data.data} /> : <NoData />);
};

LoadChart.propTypes = {
  chart: PropTypes.element,
  rpc: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  args: PropTypes.object,
  limit: PropTypes.number,
};

const AnalyticCharts = () => (
  <div className="grid max-md:place-content-center mx-5">
    <h2 className="my-2 text-3xl font-semibold">Company</h2>
    <div className="overflow-auto">
      <div className="my-5 flex flex-wrap md:flex-nowrap gap-8 place-content-center md:place-content-start">
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <LoadChart chart={<MostPostsChart />} rpc="most_posts_companies" limit={4} />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <LoadChart chart={<MostBuyAndSellChart />} rpc="most_posts_companies" limit={4} />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <LoadChart chart={<NumberOfBuyAndSellChart />} rpc="get_posts_by_month" />
        </div>
      </div>
    </div>
    <h2 className="my-2 text-3xl font-semibold">Settlements</h2>
    <div className="overflow-auto">
      <div className="my-5 flex flex-wrap md:flex-nowrap gap-8 place-content-center md:place-content-start">
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <LoadChart
            chart={<TopSellingCategoryChart />}
            rpc="top_category_by_type"
            args={{ category_type: 'SELL' }}
            limit={5}
          />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <LoadChart
            chart={<MostCommonCategoryChart />}
            rpc="top_category_by_type"
            args={{ category_type: '%' }}
            limit={6}
          />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <LoadChart
            chart={<TopBuyingCategoryChart />}
            rpc="top_category_by_type"
            args={{ category_type: 'BUY' }}
            limit={5}
          />
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticCharts;
