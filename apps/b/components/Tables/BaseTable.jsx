import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import cx from 'classnames';

// This is the base table component that every other table is built on.

/* Expected props:
  - header (A div that you want to be the header of the table)
  - theadColor (The color of the table headings)
  - data (An array of objects that you want to be the rows of the table)

  Data is expected to contain the following keys:
  [
    {
      id: int,
      profilePicture: image, // optional
      name: string,
      email: string,
      company: string,
      mobileNumber: string,
    },
  ]
  */

const BaseTable = ({ header, theadColor, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col text-center">
        <p className="text-secondary">No Data Found</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto bg-none">
      {header}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th className={cx('text-white', theadColor)}> </th> {/* Empty column for Checkbox */}
              <th className={cx('text-white', theadColor)}>User</th>
              <th className={cx('text-white', theadColor)}>E-mail</th>
              <th className={cx('text-white', theadColor)}>Company</th>
              <th className={cx('text-white', theadColor)}>Mobile Number</th>
              <th className={cx('text-white', theadColor)}>Actions</th>
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
                    {row.profilePicture && (
                      <div className="w-10 h-10 relative">
                        <Image
                          src={row.profilePicture}
                          alt="Profile Picture"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <span>{row.name}</span>
                  </div>
                </td>
                <td>{row.email}</td>
                <td>{row.company}</td>
                <td>{row.mobileNumber}</td>
                {/* <td><Image></Image> */}
              </tr>
            ))}
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
  header: PropTypes.element,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      profilePicture: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
      mobileNumber: PropTypes.string,
    })
  ),
  theadColor: PropTypes.string,
};

export default BaseTable;
