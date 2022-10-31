import {
  MostPostsChart,
  BestSellingSubCategoriesChart,
  TopSellingItemsChart,
  NumberOfBuyAndSellChart,
  MostBuyAndSellChart,
  MostCommonCategoryChart,
} from '@inc/charts';

const AnalyticCharts = () => (
  <div className="grid place-content-center">
    <h2 className="my-2 text-2xl font-semibold ">Company</h2>
    <div className="my-5 flex flex-wrap flex-direction-row gap-8">
      <div className="card w-96 bg-base-100 shadow-md">
        <MostPostsChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md">
        <MostBuyAndSellChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md">
        <NumberOfBuyAndSellChart />
      </div>
    </div>
    <h2 className="my-2 text-2xl font-semibold ">Settlements</h2>
    <div className="my-5 flex flex-wrap flex-direction-row gap-8">
      <div className="card w-96 bg-base-100 shadow-md">
        <BestSellingSubCategoriesChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md">
        <MostCommonCategoryChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md">
        <TopSellingItemsChart />
      </div>
    </div>
  </div>
);

export default AnalyticCharts;
