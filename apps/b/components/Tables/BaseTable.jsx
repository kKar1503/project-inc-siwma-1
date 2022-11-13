import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { HiDotsVertical } from 'react-icons/hi';

// This is the base table component that every other table is built on.

/* Expected props:
  - header (A div that you want to be the header of the table)
  - headings (An array of strings that will be the headings of the table)
  - headingColor (The color of the table headings)
  - showCheckbox (A boolean that determines whether or not to show the checkbox column)
  - height (The height of the table, defaults to h-fit)
  - columnKeys (An array of strings that will be the keys of the data object)
  - data (An array of objects that you want to be the rows of the table)
  - footer (A div that you want to be the footer of the table)

  Data is expected to contain the keys you specify in columnKeys. For example, if you specify columnKeys = ['name', 'profilePicture', 'email', 'company', 'mobileNumber'], then data should look like this:
  id is a COMPULSORY key that is used to uniquely identify each row. Failure to provide it will result in bad things happening. You have been warned.
  [
    {
      id: int,
      name: string,
      profilePicture: string,
      email: string,
      company: string,
      mobileNumber: string,
    },
  ]
  */

/**
 * Base table component
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const BaseTable = ({
  header,
  headings,
  headingColor,
  showCheckbox,
  className,
  columnKeys,
  isLoading,
  data,
  footer,
  onChange,
}) => (
  <div
    className={cx(className, 'bg-base-100 rounded-lg shadow-lg xl:flex-1 overflow-y-hidden w-full')}
  >
    <div className="h-full flex flex-col gap-3 py-3">
      <div className="px-6">{header}</div>
      <div className="w-full h-auto overflow-hidden border-b">
        <div className="w-full max-h-full overflow-auto">
          <table className="table w-full">
            <thead>
              <tr>
                {showCheckbox && (
                  <th className={cx('top-0 sticky rounded-none', headingColor)}> </th>
                )}
                {headings.map((heading) => (
                  <th
                    key={heading}
                    className={cx('top-0 sticky rounded-none text-white', headingColor)}
                  >
                    {heading}
                  </th>
                ))}
                <th
                  className={cx('top-0 sticky rounded-none text-white text-center', headingColor)}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                // Render a skeleton if the table is in a loading state
                isLoading && (
                  <tr>
                    {/* Loop through all columns and render a skeleton for each one */}
                    <td colSpan={headings.length + 1 + (showCheckbox ? 1 : 0)}>
                      <Skeleton className="my-2 h-6" count={10} />
                    </td>
                  </tr>
                )
              }
              {
                // Table is not in a loading state, render the data
                data &&
                  data.map((row) => (
                    <tr key={row.id}>
                      {showCheckbox && (
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox"
                              onChange={(e) => onChange(e.currentTarget)}
                            />
                          </label>
                        </td>
                      )}
                      {columnKeys.map((key, index) => (
                        <td key={key}>
                          <div className={cx('flex flex-row')}>
                            {/* Show a profilePicture if one exists and if we're on the first column */}
                            {index === 0 && row.profilePicture && (
                              <div className="w-10 h-10 mr-4">
                                <Image
                                  src={row.profilePicture}
                                  alt="Profile Picture"
                                  layout="fill"
                                  width={100}
                                  height={100}
                                  className="rounded-full aspect-square object-cover"
                                />
                              </div>
                            )}
                            {/* vertically center text */}
                            <div className="flex align-middle items-center">{row[key]}</div>
                          </div>
                        </td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className="flex items-center flex-grow-0 mx-auto text-center gap-2"
                        >
                          <HiDotsVertical />
                        </button>
                      </td>
                    </tr>
                  ))
              }
              {
                // Render a placeholder text if no data is found
                !data ||
                  (data.length === 0 && (
                    <tr>
                      <td
                        className="h-52 text-center"
                        colSpan={headings.length + 1 + (showCheckbox ? 1 : 0)}
                      >
                        <h2 className="font-bold text-lg">No data found</h2>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-3 bg-base-100">{footer}</div>
    </div>
  </div>
);

const propTypes = {
  header: PropTypes.element,
  headings: PropTypes.arrayOf(PropTypes.string),
  headingColor: PropTypes.string,
  showCheckbox: PropTypes.bool,
  className: PropTypes.string,
  columnKeys: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
  footer: PropTypes.element,
  onChange: PropTypes.func,
};

BaseTable.propTypes = propTypes;

export default BaseTable;
