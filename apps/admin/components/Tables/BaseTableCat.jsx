import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
      profilePicture: image, // optional
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
const BaseTableCat = ({
  header,
  headings,
  headingColor,
  showCheckbox,
  className,
  columnKeys,
  data,
  footer,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col text-center">
        <p className="text-secondary">No Data Found</p>
      </div>
    );
  }

  return (
    <div className={cx(className, 'bg-base-100 rounded-lg shadow-lg xl:flex-1 overflow-y-hidden')}>
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
                  <th className={cx('top-0 sticky rounded-none text-white', headingColor)}>
                    Actions
                  </th>
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
                          <div className="w-10 h-10 ">
                            <Image
                              src={row.profilePicture}
                              alt="Profile Picture"
                              layout="fill"
                              className="rounded-full"
                            />
                          </div>
                        )}
                        <span>{row[key]}</span>
                      </td>
                    ))}
                    <td>
                      {/* TODO: Replace with the proper icon once react-icons is set up */}
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li>Item 1</li>
                          <li>Item 2</li>
                        </ul>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                        className="h-5 w-5"
                      >
                        <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-3 bg-base-100">{footer}</div>
      </div>
    </div>
  );
};

const propTypes = {
  header: PropTypes.element,
  headings: PropTypes.arrayOf(PropTypes.string),
  headingColor: PropTypes.string,
  showCheckbox: PropTypes.bool,
  className: PropTypes.string,
  columnKeys: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
  footer: PropTypes.element,
};

BaseTableCat.propTypes = propTypes;

export default BaseTableCat;
