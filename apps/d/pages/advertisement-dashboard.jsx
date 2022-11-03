import { ClickDistribution, NumberOfAdsChart } from '@inc/charts';

import { BsMegaphone } from 'react-icons/bs';
import { TbHandClick } from 'react-icons/tb';

const AdvertisementDashboard = () => (
  <div className="pl-48 pr-10 bg-green-1">
    {/* <div className="space-y-4">
      <div className="card flex-initial h-18 bg-base-100 shadow-xl">
        <div className="card-body" />
      </div>
    </div> */}
    {/* <div className="flex-row flex"> */}
    <div className="flex-col flex">
      <div className="flex flex-row flex-wrap gap-8  mb-6">
        {/* Card 1 */}
        <div className="card h-48 md:w-64 lg:w-2/5 bg-base-100 shadow-xl">
          <div className="card-body flex flex-row justify-between">
            <div className="flex flex-col">
              <p className="text-blue-500 font-bold text-6xl">4</p>
              <p>Active ad-spaces</p>
            </div>
            <BsMegaphone fontSize={120} style={{ color: '#2563EB' }} />
          </div>
        </div>
        {/* Card 2 */}
        <div className="card h-48 md:w-64 lg:w-2/5 bg-base-100 shadow-xl">
          <div className="card-body text-left flex flex-row justify-between">
            <div className="flex flex-col">
              <p className="text-green-500 font-bold text-6xl ">25</p>
              <p>Total clicks</p>
            </div>
            <TbHandClick fontSize={120} style={{ color: '#34D399' }} />
          </div>
        </div>
        {/* Card 3 */}
        <div className="card flex-initial h-84 md:w-full lg:w-11/12 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title">Active ad-spaces</div>
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>E-mail</th>
                    <th>Company</th>
                    <th>Mobile number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cy Ganderton</td>
                    <td>cy@gmail.com</td>
                    <td>abc</td>
                    <td>98765432</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  <tr>
                    <td>Cy Ganderton</td>
                    <td>cy@gmail.com</td>
                    <td>abc</td>
                    <td>98765432</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  <tr>
                    <td>Cy Ganderton</td>
                    <td>cy@gmail.com</td>
                    <td>abc</td>
                    <td>98765432</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  <tr>
                    <td>Cy Ganderton</td>
                    <td>cy@gmail.com</td>
                    <td>abc</td>
                    <td>98765432</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  <tr className="active">
                    <td />
                    <td />
                    <td>Inactive ad-space</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 space-y-4">
        {/* Card 4 */}
        <div className="card flex-initial h-96 md:width-3/4 lg:width-11/12 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title">Total click distribution</div>
            <p>Number of clicks per ad-space</p>
            <ClickDistribution />
          </div>
        </div>
        {/* Card 5 */}
        <div className="card flex-initial h-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title">Number of active ad-space per month</div>
            <NumberOfAdsChart />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdvertisementDashboard;
