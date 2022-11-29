import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import UploadCard from '../components/UploadCard';
import NavBar from '../components/NavBar';
import AdminPageLayout from '../components/layouts/AdminPageLayout';

const AdminUpload = () => {
  const [userInput, setUserInput] = useState('');
  const [selected, setSelected] = useState(0);
  const [companyData, setCompanyData] = useState(null);
  const [description, setDescription] = useState('');
  const supabase = useSupabaseClient();

  const getCompanyData = async () => supabase.from('companies').select('*');
  const { data, isLoading } = useQuery('company', getCompanyData);

  const filter = () => {
    if (userInput !== '') {
      return data.data.filter((val) => val.name.toLowerCase().includes(userInput.toLowerCase()));
    }

    return data.data;
  };

  return (
    <div className="w-full p-8 gap-8 overflow-auto xl:max-h-screen">
      <NavBar />
      <div className="text-xl breadcrumbs text-black ml-10 mt-24 mb-14">
        <ul>
          <li>
            <Link href="/AdvertisementDashboard" className="hover:underline">
              Advertisement
            </Link>
          </li>
          <li>
            <Link href="/AdminUpload" className="hover:underline">
              Upload
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row ml-10 ">
        <div className="card w-1/3 max-sm:w-full h-80 bg-base-100 shadow-xl mr-10 max-sm:mb-10">
          <h1 className="ml-4 leading-loose font-bold text-xl mt-6">Company to tag</h1>
          <div>
            <input
              className="w-3/4 h-10 px-4 ml-4 mt-4 text-base placeholder-gray-500 border rounded-lg focus:shadow-outline"
              type="text"
              placeholder="Search"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto m-6 h-36 ...">
            <ul>
              {data &&
                filter().map((item) => (
                  <li key={item.id} className="text-sm p-2">
                    <input
                      type="radio"
                      name="company"
                      id="company"
                      className="mr-2 h-4 w-4"
                      onChange={() => setSelected(item.id)}
                    />
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="card w-1/3  max-sm:w-full h-80 bg-base-100 shadow-xl mr-10 max-sm:mb-10">
          <div className="max-w-xl">
            <h1 className="ml-4 leading-loose font-bold text-xl mt-6">
              Description of Advertisement
            </h1>
            <div className="flex justify-center">
              <textarea
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                disabled={selected === 0}
                className="w-11/12 h-40 px-4 mt-4 text-base placeholder-gray-500 break-normal border rounded-lg focus:shadow-outline"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card w-1/3  max-sm:w-full h-80 bg-base-100 shadow-xl px-8 py-8 ">
          <UploadCard id={selected} des={description} />
        </div>
      </div>
    </div>
  );
};

AdminUpload.getLayout = (page) => <AdminPageLayout pageName="AdminUpload">{page}</AdminPageLayout>;

export default AdminUpload;
