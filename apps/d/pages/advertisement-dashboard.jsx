import { NumberOfAdsChart } from '@inc/charts';

const AdvertisementDashboard = () => (
  <div className="pl-48">
    <NumberOfAdsChart />
    <div>
      <div className="space-y-4">
        <div className="card flex-initial h-18 bg-base-100 shadow-xl">
          <div className="card-body" />
        </div>
      </div>

      <div className="flex flex-row space-y-4 gap-8">
        <div className="card flex-initial h-36 w-96  shadow-xl">
          <div className="card-body">
            <div className="card-title text-blue-600 text-xl">4</div>
            <p>Active ad-spaces</p>
          </div>
        </div>
        <div className="card flex-initial h-36 w-96  shadow-xl">
          <div className="card-body">
            <div className="card-title text-green-400">25</div>
            <p>Total clicks</p>
          </div>
        </div>
        <div className="card flex-initial w-96 shadow-xl">
          <div className="card-body">
            <div className="card-title">Total click distribution</div>
            <p>Number of clicks per ad-space</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-row gap-8 space-y-4">
      <div className="card flex-initial h-84 w-7/12 bg-base-100 shadow-xl">
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
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-title">Number of active ad-space per month</div>
        </div>
      </div>
    </div>
  </div>
);

export default AdvertisementDashboard;
