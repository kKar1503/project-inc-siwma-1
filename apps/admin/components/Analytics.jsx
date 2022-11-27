import {
  MostPostsChart,
  BestSellingSubCategoriesChart,
  TopSellingItemsChart,
  NumberOfBuyAndSellChart,
  MostBuyAndSellChart,
  MostCommonCategoryChart,
} from '@inc/charts';

const AnalyticCharts = () => (
  <div className="grid max-md:place-content-center mx-5">
    <h2 className="my-2 text-3xl font-semibold">Company</h2>
    <div className="overflow-auto">
      <div className="my-5 flex flex-wrap md:flex-nowrap gap-8 place-content-center md:place-content-start">
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <MostPostsChart />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <MostBuyAndSellChart />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <NumberOfBuyAndSellChart />
        </div>
      </div>
    </div>
    <h2 className="my-2 text-3xl font-semibold">Settlements</h2>
    <div className="overflow-auto">
      <div className="my-5 flex flex-wrap md:flex-nowrap gap-8 place-content-center md:place-content-start">
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <BestSellingSubCategoriesChart />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <MostCommonCategoryChart />
        </div>
        <div className="card bg-base-100 shadow-md shrink-0 lg:flex-1">
          <TopSellingItemsChart />
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticCharts;
