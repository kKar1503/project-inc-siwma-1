import { useState } from 'react';

const datas = ['company A', 'company B', 'company C'];

const AdminUpload = () => {
  const [buttonText, setButtonText] = useState('+');

  const handleClick = (e) => {
    e.preventDefault();
    setButtonText(' x');
    setTimeout(() => {
      setButtonText('+');
    }, 1000);
  };

  return (
    <div className="flex flex-row-reverse space-x-16 space-x-reverse my-32 mx-8 ...">
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
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />{' '}
                <polyline points="7 9 12 4 17 9" /> <line x1="12" y1="4" x2="12" y2="16" />
              </svg>
              <p className="text-xs text-gray-600 text-center my-6">
                Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)
              </p>
            </span>
            <input type="file" name="file_upload" className="hidden" />
          </label>
          <button className="btn btn-active btn-ghost rounded-md w-1/2 h-6 mx-20 my-8 normal-case text-base">
            Create
          </button>
        </div>
      </div>
      <div className="card w-1/3 h-80 bg-base-100 shadow-xl">
        <h1 className="ml-4 leading-loose font-bold text-xl">Company to tag</h1>
        <div>
          <input
            className="w-3/4 h-10 px-4 ml-4 mt-4 text-base placeholder-gray-500 border rounded-lg focus:shadow-outline"
            type="text"
            placeholder="Search"
          />
          {/* <button className="btn btn-outline btn-accent rounded-xl">
            Search
          </button> */}
        </div>
        <table className="table-fixed">
          {/* <thead>
            <tr>
              <th>Companies</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td>
                <ul className=" ml-8 leading-loose text-gray-600 text-xl">
                  {datas.map((data) => (
                    <li>
                      {data}
                      <button className="ml-12" onClick={handleClick}>
                        {' '}
                        {buttonText}
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUpload;
