import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import UploadCard from '../components/UploadCard';
import supabase from '../supabase';

const AdminUpload = () => {
  const [userInput, setUserInput] = useState('');
  const [selected, setSelected] = useState(0);
  const [companyData, setCompanyData] = useState(null);
  const [description, setDescription] = useState('');

  const getCompanyData = async () => supabase.from('companies').select('*');
  const { data, isLoading } = useQuery('company', getCompanyData);

  const filter = () => {
    if (userInput !== '') {
      return data.data.filter((val) => val.name.toLowerCase().includes(userInput.toLowerCase()));
    }

    return data.data;
  };

  return (
    <>
      <nav className="text-black ml-10 mt-24 mb-14" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/home" className="hover:underline">
              Advertisement
            </Link>
            <svg
              className="fill-current w-3 h-3 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li className="flex items-center">
            <Link href="/home" className="hover:underline">
              Upload
            </Link>
            <svg
              className="fill-current w-3 h-3 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
        </ol>
      </nav>
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
    </>
  );
};

export default AdminUpload;
