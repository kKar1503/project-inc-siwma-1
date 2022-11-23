import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { HiDotsVertical } from 'react-icons/hi';
import { ImCross, ImCheckmark } from 'react-icons/im';

// This is the base table component that every other table is built on.

//! Note: tentatively, the table header uses inline styles due to a DaisyUI issue that sets the table header's left property to 0px. This may be a temporary fix until the issue is resolved.

/* Expected props:
  - header (A div that you want to be the header of the table)
  - headings (An array of strings that will be the headings of the table)
  - headingColor (The color of the table headings)
  - showCheckbox (A boolean that determines whether or not to show the checkbox column)
  - height (The height of the table, defaults to h-fit)
  - columnKeys (An array of strings that will be the keys of the data object)
  - centerColumns (Columns that should have both their header and content centered)
  - selectedRows (Rows of the table which have been selected; requires showCheckbox to be true)
  - isLoading (Whether or not the table is in a loading state)
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
  centerColumns,
  selectedRows,
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
                    // Center the heading if it exists in the centerColumns array
                    className={cx(
                      'top-0 sticky rounded-none text-white',
                      { 'text-center': centerColumns ? centerColumns.includes(heading) : false },
                      headingColor
                    )}
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
                              onChange={(e) => onChange(row, e.currentTarget.checked)}
                              // Give the checkbox a checked state if the current row being rendered is selected
                              defaultChecked={
                                selectedRows ? selectedRows.find((e) => e === row.id) : false
                              }
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
                            {
                              // Vertically center text and horizontally center text (if required)
                              // Determines if the text should be horizontally centered by checking if the centerColumns array includes the name of the heading this column is being rendered for
                            }
                            <div
                              className={cx('flex align-middle items-center', {
                                'mx-auto': centerColumns
                                  ? centerColumns.includes(headings[index])
                                  : false,
                              })}
                            >
                              {
                                // Render the value of the column (will not render anything if the value is a boolean)
                                row[key]
                              }
                              {/* Render boolean values as a tick or a cross */}
                              {
                                // Render a tick if boolean value is true
                                typeof row[key] === 'boolean' && row[key] && (
                                  <ImCheckmark className="text-success" />
                                )
                              }
                              {
                                // Render a cross if boolean value is false
                                typeof row[key] === 'boolean' && !row[key] && (
                                  <ImCross className="text-error" />
                                )
                              }
                            </div>
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
                !isLoading &&
                  (!data ||
                    (data.length === 0 && (
                      <tr>
                        <td
                          className="h-52 text-center"
                          colSpan={headings.length + 1 + (showCheckbox ? 1 : 0)}
                        >
                          <h2 className="font-bold text-lg">No companies found</h2>
                        </td>
                      </tr>
                    )))
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
  centerColumns: PropTypes.arrayOf(PropTypes.string),
  selectedRows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
  footer: PropTypes.element,
  onChange: PropTypes.func,
};

BaseTable.propTypes = propTypes;

export default BaseTable;
