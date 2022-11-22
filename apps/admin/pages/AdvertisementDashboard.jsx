import { ClickDistribution, NumberOfAdsChart } from '@inc/charts';
import { useState } from 'react';

// import { createServiceSupabaseClient } from '@inc/utils';
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Activeads from '../components/Ads/Activeads';
import Clicks from '../components/Ads/Clicks';
import supabase from '../supabase';
// import Tableads from '../components/Ads/Tableads';

const adSpaceData = [
  { id: 1, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
  { id: 2, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
  { id: 3, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
  { id: 4, name: 'Cy Ganderton', email: 'cy@gmail.com', company: 'abc', tel: '98765432' },
];

const AdvertisementDashboard = () => {
  const [queryClient] = useState(() => new QueryClient());

  // const [supabaseClient] = useState(() => createServiceSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default AdvertisementDashboard;
