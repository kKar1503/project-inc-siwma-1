import Activeads from '../components/Ads/Activeads';
import Clicks from '../components/Ads/Clicks';
import ClicksGraph from '../components/Ads/ClicksGraph';
import Tableads from '../components/Ads/Tableads';
import AvgGraphs from '../components/Ads/AvgChart';
// import Tableads from '../components/Ads/Tableads';

const adSpaceData = [
  { id: 1, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', clicks: '2' },
  { id: 2, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', clicks: '2' },
  { id: 3, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', clicks: '2' },
  { id: 4, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', clicks: '2' },
];

const AdvertisementDashboard = () => (
  <div className="grid lg:grid-cols-3 lg:grid-rows-4 gap-8 p-8 bg-base-200">
    <div className="flex lg:col-span-2 lg:row-span-1 gap-8">
      <div className="card shadow-xl w-1/2 bg-base-100 rounded-xl">
        <div className="card-body flex-row justify-between">
          <Activeads />
        </div>
      </div>
      <div className="card shadow-xl w-1/2 bg-base-100 rounded-xl">
        <div className="card-body flex-row justify-between">
          <Clicks />
        </div>
      </div>
    </div>
    <div className="card shadow-xl bg-base-100 rounded-xl lg:row-span-2">
      <div className="card-body">
        <div className="card-title">Total click distribution</div>
        <p>Number of clicks per ad-space</p>
        <ClicksGraph />
      </div>
    </div>
    <div className="card shadow-xl bg-base-100 rounded-xl lg:order-last lg:row-span-2">
      <div className="card-body">
        <div className="card-title">Number of clicks per month</div>
        <p>Year 2022</p>
        <AvgGraphs />
      </div>
    </div>
    <div className="card shadow-xl bg-base-100 rounded-xl lg:col-span-2 lg:row-span-3">
      <div className="card-body justify-between">
        <div className="card-title">Active ad-spaces</div>
        <div className="overflow-x-auto" />
        <Tableads />
        <div />
      </div>
    </div>
  </div>
);

export default AdvertisementDashboard;
