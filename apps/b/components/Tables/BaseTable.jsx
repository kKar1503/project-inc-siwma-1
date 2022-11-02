import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TableButton from './TableButton';

// This is the base table component that every other table is built on.

/* Expected props:
  - header (A div that you want to be the header of the table)
  - headings (An array of strings that will be the headings of the table)
  - headingColor (The color of the table headings)
  - columnKeys (An array of strings that will be the keys of the data object)
  - data (An array of objects that you want to be the rows of the table)
  - footer (A div that you want to be the footer of the table)

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

const BaseTable = ({ header, headings, headingColor, showCheckbox, columnKeys, data, footer }) => {
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
      <div className="w-full">
        <table className="table w-full">
          <thead>
            <tr>
              {showCheckbox && <th className={cx('rounded-none', headingColor)}> </th>}
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
                {showCheckbox && (
                  <td>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </td>
                )}
                {columnKeys.map((key, index) => (
                  <td key={key}>
                    {/* Show a profilePicture if one exists and if we're on the first column */}
                    {index === 0 && row.profilePicture && (
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
          <tfoot>
            <tr>
              <td colSpan={headings.length + 1} className="bg-white rounded-none">
                {footer}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

BaseTable.propTypes = {
  header: PropTypes.element,
  headings: PropTypes.arrayOf(PropTypes.string),
  headingColor: PropTypes.string,
  showCheckbox: PropTypes.bool,
  columnKeys: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
  footer: PropTypes.element,
};

export default BaseTable;
