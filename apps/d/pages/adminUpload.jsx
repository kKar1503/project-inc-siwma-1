/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';

const dataList = [
  { id: '1', data: 'abc company' },
  { id: '2', data: 'efg company' },
  { id: '3', data: 'company c' },
  { id: '4', data: 'kkkkkkk' },
];

// const data2 = [
//   { id: '1', name: 'abc company', selected: false },
//   { id: '2', name: 'efg company', selected: false },
//   { id: '3', name: 'company c', selected: false },
//   { id: '4', name: 'kkkkkkk', selected: false },
// ];

const AdminUpload = () => {
  const [getData, setGetData] = useState([]);
  const [userInput, setUserInput] = useState('');

  // useEffect(() => {
  //   setGetData({ type: 'data', data: dataList });
  // }, []);

  useEffect(() => {
    setGetData(dataList);
  }, []);

  const filter = () => {
    if (userInput !== '')
      return getData.filter((val) => val.data.toLowerCase().includes(userInput.toLowerCase()));

    return getData;
  };

  return (
    <>
      <nav className="text-black ml-72 mt-24 mb-14" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="#">Advertisement</a>
            <svg
              className="fill-current w-3 h-3 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li className="flex items-center">
            <a href="#">Advertisement Post</a>
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
      <div className="flex flex-row-reverse space-x-16 space-x-reverse my-30 mr-10 ...">
        <div className="card w-1/3 h-80 bg-base-100 shadow-xl px-8 py-8 ">
          <div className="max-w-xl">
            <label className="flex justify-center w-full h-40 px-4 mt-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="items-center space-x-2">
                <svg
                  className="h-16 w-16 text-black m-auto my-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                  <polyline points="7 9 12 4 17 9" /> <line x1="12" y1="4" x2="12" y2="16" />
                </svg>
                <p className="text-xs text-gray-600 text-center my-6">
                  Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)
                </p>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
            <button className="btn btn-active btn-ghost rounded-md w-1/2 h-6 mx-24 my-8 normal-case text-base">
              Create
            </button>
          </div>
        </div>
        <div className="card w-1/3 h-80 bg-base-100 shadow-xl">
          <h1 className="ml-4 leading-loose font-bold text-xl mt-6">Company to tag</h1>
          <div>
            <input
              className="w-3/4 h-10 px-4 ml-4 mt-4 text-base placeholder-gray-500 border rounded-lg focus:shadow-outline"
              type="text"
              placeholder="Search"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <table className="table-fixed">
            <tbody>
              <tr>
                <td>
                  {/* <ul className=" ml-8 leading-loose text-gray-600 text-xl">
                    {getData !== null &&
                      getData?.type === 'data' &&
                      // searchInput.length <= 1 &&
                      filter().getData.data.map((item) => (
                        <li key={getData.id}>
                          <input type="checkbox" name="checkbox" />
                          {item.name}
                        </li>
                      ))}
                  </ul> */}
                  <ul>
                    {filter().map((item) => (
                      <li key={getData.id} className="text-xl">
                        <input type="checkbox" name="checkbox" className="mr-2 ml-4 mt-2 h-4 w-4" />
                        {item.data}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUpload;
