import React from 'react';
// import Image from 'next/image';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTable, useFilters, useGlobalFilter } from 'react-table';

import { HiDotsVertical } from 'react-icons/hi';
import { ImCross, ImCheckmark } from 'react-icons/im';

import SearchBar from '../SearchBar';
// This is the base table component that every other table is built on.

//! Note: tentatively, the table header uses inline styles due to a DaisyUI issue that sets the table header's left property to 0px. This may be a temporary fix until the issue is resolved.

// Problem: Center Columns not integrated properly yet, boolean values turning into checkmarks not done either

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
  columns,
  centerColumns,
  selectedRows,
  isLoading,
  data,
  footer,
  searchPlaceholder,
  onChange,
}) => {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );
  const { globalFilter } = state;
  return (
    <div
      className={cx(
        className,
        'bg-base-100 rounded-lg shadow-lg xl:flex-1 overflow-y-hidden w-full'
      )}
    >
      <div className="h-full flex flex-col gap-3 py-3">
        <div className="px-6">
          <div className="flex flex-row justify-between items-center">
            {header}
            <div className="flex flex-row gap-4">
              <SearchBar
                placeholder={searchPlaceholder}
                filter={globalFilter}
                setFilter={setGlobalFilter}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto overflow-hidden border-b">
          <div className="w-full max-h-full overflow-auto">
            <table {...getTableProps()} className="table w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {showCheckbox && (
                      <th className={cx('top-0 sticky rounded-none', headingColor)}> </th>
                    )}
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className={cx('top-0 sticky rounded-none text-white', headingColor)}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
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
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
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
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
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
};

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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.string,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
  footer: PropTypes.element,
  searchPlaceholder: PropTypes.string,
  onChange: PropTypes.func,
};

BaseTable.propTypes = propTypes;

export default BaseTable;
