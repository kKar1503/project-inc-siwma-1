import {
  MostPostsChart,
  BestSellingSubCategoriesChart,
  TopSellingItemsChart,
  NumberOfBuyAndSellChart,
  MostBuyAndSellChart,
  MostCommonCategoryChart,
} from '@inc/charts';

const Home = () => (
  <div className="flex flex-col">
    <div className="flex">
      <div className="p-5 m-5">
        <MostPostsChart />
      </div>
      <div className="p-5 m-5">
        <MostBuyAndSellChart />
      </div>
      <div className="p-5 m-5">
        <NumberOfBuyAndSellChart />
      </div>
    </div>
    <div className="flex">
      <div className="p-5 m-5">
        <BestSellingSubCategoriesChart />
      </div>
      <div className="p-5 m-5">
        <MostCommonCategoryChart />
      </div>
      <div className="p-5 m-5">
        <TopSellingItemsChart />
      </div>
    </div>
  </div>
);

export default Home;
