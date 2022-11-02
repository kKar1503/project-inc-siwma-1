import { ClickDistribution, NumberOfAdsChart } from '@inc/charts';
import { BsMegaphone } from 'react-icons/bs';
import { TbHandClick } from 'react-icons/tb';

const adSpaceData = [
  { id: 1, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
  { id: 2, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
  { id: 3, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
  { id: 4, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
];

import { BsMegaphone } from 'react-icons/bs';
import { TbHandClick } from 'react-icons/tb';

const AdvertisementDashboard = () => (
<<<<<<< HEAD
  <div className="grid lg:grid-cols-3 lg:grid-rows-4 gap-8 p-8 bg-base-200">
    <div className="flex lg:col-span-2 lg:row-span-1 gap-8">
      <div className="card shadow-xl w-1/2 bg-base-100 rounded-xl">
        <div className="card-body flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-blue-500 font-bold text-6xl">4</p>
            <p>Active ad-spaces</p>
          </div>
          <BsMegaphone fontSize={80} style={{ color: '#2563EB' }} />
=======
  <div className="pl-48 pr-10 ">
    <div className="space-y-4">
      <div className="card flex-initial h-18 bg-base-100 shadow-xl">
        <div className="card-body" />
      </div>
    </div>
    <div className="flex flex-row">
      <div className="flex flex-row flex-wrap space-y-4 gap-8">
        <div className="card flex-initial h-36 w-96  shadow-xl">
          <div className="card-body flex flex-row">
            <div className="flex flex-col">
              <p className="text-blue-500 font-bold text-6xl">4</p>
              <p>Active ad-spaces</p>
            </div>
            <BsMegaphone fontSize={100} style={{ color: '#2563EB' }} />
          </div>
        </div>
        <div className="card flex-initial h-36 w-96  shadow-xl">
          <div className="card-body flex flex-row">
            <div className="flex flex-col">
              <p className="text-green-500 font-bold text-6xl ">25</p>
              <p>Total clicks</p>
            </div>
            <TbHandClick fontSize={100} style={{ color: '#34D399' }} />
          </div>
        </div>
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
>>>>>>> da6b9fa (style: card styling)
        </div>
      </div>
      <div className="card shadow-xl w-1/2 bg-base-100 rounded-xl">
        <div className="card-body flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-green-500 font-bold text-6xl ">25</p>
            <p>Total clicks</p>
          </div>
          <TbHandClick fontSize={80} style={{ color: '#34D399' }} />
        </div>
      </div>
    </div>
    <div className="card shadow-xl bg-base-100 rounded-xl lg:row-span-2">
      <div className="card-body">
        <div className="card-title">Total click distribution</div>
        <p>Number of clicks per ad-space</p>
        <ClickDistribution />
      </div>
    </div>
    <div className="card shadow-xl bg-base-100 rounded-xl lg:order-last lg:row-span-2">
      <div className="card-body">
        <div className="card-title">Active ad-space per month</div>
        <p>Year 2022</p>
        <NumberOfAdsChart />
      </div>
    </div>
    <div className="card shadow-xl bg-base-100 rounded-xl lg:col-span-2 lg:row-span-3">
      <div className="card-body justify-between">
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
              {adSpaceData.map(({ id, name, email, company, tel }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{company}</td>
                  <td>{tel}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
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
        <div />
      </div>
    </div>
  </div>
);

export default AdvertisementDashboard;
