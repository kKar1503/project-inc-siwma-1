import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import cx from 'classnames';

// This is the base table component that every other table is built on.

/* Expected props:
  - header (A div that you want to be the header of the table)
  - headings (An array of strings that will be the headings of the table)
  - headingColor (The color of the table headings)
  - columnKeys (An array of strings that will be the keys of the data object)
  - data (An array of objects that you want to be the rows of the table)

  Data is expected to contain the keys you specify in columnKeys. For example, if you specify columnKeys = ['name', 'profilePicture', 'email', 'company', 'mobileNumber'], then data should look like this:
  id is a COMPULSORY key that is used to uniquely identify each row. Failure to provide it will result in bad things happening. You have been warned.
  [
    {
      id: int,
      name: string,
      profilePicture: image, // optional
      email: string,
      company: string,
      mobileNumber: string,
    },
  ]
  */

const BaseTable = ({ header, headings, headingColor, columnKeys, data }) => {
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
              <th className={headingColor}> </th> {/* For the Checkbox */}
              {headings.map((heading) => (
                <th key={heading} className={cx('text-white', headingColor)}>
                  {heading}
                </th>
              ))}
              <th className={cx('text-white', headingColor)}>Actions</th>
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
                {columnKeys.map((key) => (
                  <td key={key}>
                    {key === 'name' && row.profilePicture && (
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
                    <span>{row[key]}</span>
                  </td>
                ))}
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
  headings: PropTypes.arrayOf(PropTypes.string),
  headingColor: PropTypes.string,
  columnKeys: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
};

export default BaseTable;
