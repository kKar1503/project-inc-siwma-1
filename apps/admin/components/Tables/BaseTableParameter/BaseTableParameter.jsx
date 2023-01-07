import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BaseTableRow from './ParamTableRow';
import BaseTableHeader from './ParamTableHeader';

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
  - onChange (Invoked when a row is selected/deselected)
  - actionMenu (The menu to be displayed should the action button be clicked on; Action button will only be rendered if this prop is specified)
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
  table,
  footer,
  onChange,
  actionMenu,
}) => {
  // -- States -- //
  // Keeps track of the currently shown action menu
  const [currShownMenu, setCurrShownMenu] = useState(-1);

  // Refs
  const tableBodyRef = useRef();

  return (
    <div
      className={cx(
        className,
        'bg-base-100 rounded-lg shadow-lg xl:flex-1 overflow-y-hidden w-full'
      )}
    >
      <div className="h-full flex flex-col gap-3 py-3">
        <div className="px-6">{header}</div>
        <div className="w-full h-auto overflow-hidden border-b">
          <div className="w-full max-h-full overflow-auto">
            <table className="table w-full">
              <thead>
                <BaseTableHeader
                  headingColor={headingColor}
                  headings={headings}
                  centerColumns={centerColumns}
                  showActionsColumn={Boolean(actionMenu)}
                  showCheckbox={showCheckbox}
                />
              </thead>
              <tbody ref={tableBodyRef}>
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
                      <BaseTableRow
                        table={table}
                        key={row.id}
                        selected={selectedRows ? selectedRows.find((e) => e === data.id) : false}
                        columnKeys={columnKeys}
                        headings={headings}
                        centerColumns={centerColumns}
                        data={row}
                        onChange={onChange}
                        showCheckbox={showCheckbox}
                        actionMenu={actionMenu}
                        showActionMenu={row.id === currShownMenu}
                        onToggleActionMenu={() => {
                          // Check if the currently shown menu is the current row
                          if (currShownMenu === row.id) {
                            // It is, hide it
                            return setCurrShownMenu(-1);
                          }

                          // It is not, show it
                          return setCurrShownMenu(row.id);
                        }}
                        ref={tableBodyRef}
                      />
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
                            <h2 className="font-bold text-lg">No data found</h2>
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
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
  footer: PropTypes.element,
  onChange: PropTypes.func,
  actionMenu: PropTypes.node,
  table: PropTypes.string,
};

BaseTable.propTypes = propTypes;

export default BaseTable;
