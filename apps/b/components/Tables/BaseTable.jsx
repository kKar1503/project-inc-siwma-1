import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

// This is the base table component that every other table is built on.

/* Expected props:
  - header (A div that you want to be the header of the table)
  - data (An array of objects that you want to be the rows of the table)

  Data is expected to contain at least the following keys:
  [
    {
      id: int,
      profilePicture: image,
      name: string,
      email: string,
      company: string,
      mobileNumber: string,
    },
  ]
  */

const BaseTable = ({ header, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col text-center">
        <p className="text-secondary">No Data Found</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>User</th>
              <th>E-mail</th>
              <th>Company</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={row.profilePicture}
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <span>{row.name}</span>
                  </div>
                </td>
                <td>{row.email}</td>
                <td>{row.company}</td>
                <td>{row.mobileNumber}</td>
                {/* <td><Image></Image> */}
              </tr>
            ))}
            {/* <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <Image
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr> */}
          </tbody>
          {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
        </table>
      </div>
    </div>
  );
};

BaseTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default BaseTable;
