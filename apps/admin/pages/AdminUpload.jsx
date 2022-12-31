import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import UploadCard from '../components/UploadCard';
import NavBar from '../components/NavBar';
import AdminPageLayout from '../components/layouts/AdminPageLayout';

const AdminUpload = () => {
  const [userInput, setUserInput] = useState('');
  const [handleSubmit, sethandleSubmit] = useState(false);
  const [selected, setSelected] = useState(0);
  const [link, setLink] = useState('');
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
    <div className="flex flex-col w-full h-full p-8 gap-8 overflow-auto xl:max-h-screen">
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
              id="search"
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
            <div className="flex justify-center m-4">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sethandleSubmit(true);
                }}
              >
                <label htmlFor="Description" className="text-lg">
                  Description
                </label>
                <textarea
                  id="description"
                  type="text"
                  name="description"
                  // placeholder="Description"
                  value={description}
                  disabled={selected === 0}
                  required
                  className="w-11/12 h-20 mx-4 mb-10 text-base placeholder-gray-500 break-normal border rounded-lg focus:shadow-outline"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="Link" className="text-lg">
                  Company&#39;s Link
                </label>
                <input
                  type="url"
                  name="link"
                  id="link"
                  // placeholder="Description"
                  value={link}
                  disabled={selected === 0}
                  className="w-11/12 h-10 mx-4 text-base placeholder-gray-500 break-normal border rounded-lg focus:shadow-outline"
                  onChange={(e) => setLink(e.target.value)}
                />
                <div className="mx-36 mt-3">
                  <button className="btn btn-outline btn-primary" type="submit" id="save">
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <UploadCard id={selected} des={description} link={link} state={handleSubmit} />
      </div>
    </div>
  );
};

AdminUpload.getLayout = (page) => (
  <AdminPageLayout pageName="Advertisement">{page}</AdminPageLayout>
);

export default AdminUpload;
