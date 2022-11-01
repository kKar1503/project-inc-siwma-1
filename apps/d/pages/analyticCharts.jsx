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
    <div className="my-5 flex flex-wrap md:flex-nowrap overflow-auto gap-8">
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
    <div className="my-5 flex flex-wrap md:flex-nowrap overflow-auto  gap-8">
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

// const AnalyticCharts = () => (
//   <div className="flex flex-col items-center ">
//     <div className="">
//       <h2 className="my-2 text-2xl font-semibold ">Company</h2>
//     </div>
//     <div className="w-full my-5 flex flex-col items-center justify-center sm:flex-row overflow-auto flex-direction-row gap-8 ">
//       <div className="card w-96 bg-base-100 shadow-md shrink-0">
//         <MostPostsChart />
//       </div>
//       <div className="card w-96 bg-base-100 shadow-md shrink-0">
//         <MostBuyAndSellChart />
//       </div>
//       <div className="card w-96 bg-base-100 shadow-md shrink-0">
//         <NumberOfBuyAndSellChart />
//       </div>
//     </div>
//     <h2 className="my-2 text-2xl font-semibold ">Settlements</h2>
//     <div className="my-5 w-full flex flex-col justify-center sm:flex-row overflow-auto flex-direction-row gap-8">
//       <div className="card w-96 bg-base-100 shadow-md shrink-0">
//         <BestSellingSubCategoriesChart />
//       </div>
//       <div className="card w-96 bg-base-100 shadow-md shrink-0">
//         <MostCommonCategoryChart />
//       </div>
//       <div className="card w-96 bg-base-100 shadow-md shrink-0">
//         <TopSellingItemsChart />
//       </div>
//     </div>
//   </div>
// );

export default AnalyticCharts;
