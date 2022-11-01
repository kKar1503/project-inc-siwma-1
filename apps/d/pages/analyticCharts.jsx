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
    <div className="my-5 flex max-sm:flex-wrap max-md:flex-nowrap overflow-auto flex-direction-row gap-8">
      <div className="card w-96 bg-base-100 shadow-md shrink-0">
        <MostPostsChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md shrink-0">
        <MostBuyAndSellChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md shrink-0">
        <NumberOfBuyAndSellChart />
      </div>
    </div>
    <h2 className="my-2 text-2xl font-semibold ">Settlements</h2>
    <div className="my-5 flex max-sm:flex-wrap max-md:flex-nowrap overflow-auto flex-direction-row gap-8">
      <div className="card w-96 bg-base-100 shadow-md shrink-0">
        <BestSellingSubCategoriesChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md shrink-0">
        <MostCommonCategoryChart />
      </div>
      <div className="card w-96 bg-base-100 shadow-md shrink-0">
        <TopSellingItemsChart />
      </div>
    </div>
  </div>
);

export default AnalyticCharts;
