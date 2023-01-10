import Image from 'next/image';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { HiDotsVertical } from 'react-icons/hi';
import React, { useEffect, useRef } from 'react';

/**
 * Row component for BaseTable
 * Not the best because a lot of props are passed in lol
 * @param {object} data Data for the row
 * @param {boolean} showCheckbox Whether or not to render a checkbox for the row
 * @param {[string]} columnKeys Keys for each table column
 * @param {[string]} headings The heading for each table column
 * @param {[string]} centerColumns The columns to be centered
 * @param {boolean} selected Whether or not the row is currently selected
 * @param {React.ReactNode} actionMenu The action menu to display if the action button is clicked on (Action button only renders if this prop is specified; Setting this prop makes the tableRef prop required)
 * @param {boolean} showActionMenu Whether or not to show the action menu
 * @param {()} onToggleActionMenu The function to invoke when the action menu gets shown
 * @param {React.Ref} tableRef Reference to the table (Required if the actionMenu prop is set)
 * @param {()} onChange The function to invoke when the row gets selected/deselected
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A table row
 */
const BaseTableRow = React.forwardRef(
  (
    {
      data,
      showCheckbox,
      columnKeys,
      headings,
      centerColumns,
      selected,
      actionMenu,
      showActionMenu,
      onToggleActionMenu,
      onChange,
    },
    tableRef
  ) => {
    // References
    const actionMenuRef = useRef();

    // -- Hooks -- //
    useEffect(() => {
      // -- Determine where the offset the action menu should have, such that it does not exit the bounds of the table -- //
      // Check if the action menu offset needs to be calculated
      if (!actionMenu) {
        // No action menu was provided, so there is no need to calculate the offset
        return;
      }

      // Retrieve the coordinates of the table component and action menu component
      const tableCoords = tableRef.current.getBoundingClientRect();
      const actionMenuCoords = actionMenuRef.current.getBoundingClientRect();

      // Check if the action menu is outside the bounding box of the table
      if (
        actionMenuCoords.top < tableCoords.top ||
        actionMenuCoords.right > tableCoords.right ||
        actionMenuCoords.bottom > tableCoords.bottom ||
        actionMenuCoords.left < tableCoords.left
      ) {
        // It is outside the bounding box
        // Calculate the required vertical offset for the actionMenu, such that it is within the bounds of the table
        actionMenuRef.current.style.top = 'auto';
        actionMenuRef.current.style.bottom = `30px`;
      }
    }, []);

    return (
      <tr className='last:border-b'>
        {showCheckbox && (
          <td>
            <label>
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => onChange(data, e.currentTarget.checked)}
                // Give the checkbox a checked state if the current row being rendered is selected
                defaultChecked={selected}
              />
            </label>
          </td>
        )}
        {columnKeys.map((key, index) => (
          <td key={key}>
            <div className={cx('flex flex-data')}>
              {/* Show a profilePicture if one exists and if we're on the first column */}
              {index === 0 && data.profilePicture && (
                <div className="w-10 h-10 mr-4">
                  <Image
                    src={data.profilePicture}
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
                  'mx-auto': centerColumns ? centerColumns.includes(headings[index]) : false,
                })}
              >
                {
                  // Render the value of the column (will not render anything if the value is a boolean)
                  data[key]
                }
                {/* Render boolean values as a tick or a cross */}
                {
                  // Render a tick if boolean value is true
                  typeof data[key] === 'boolean' && data[key] && (
                    <ImCheckmark className="text-success" />
                  )
                }
                {
                  // Render a cross if boolean value is false
                  typeof data[key] === 'boolean' && !data[key] && <ImCross className="text-error" />
                }
              </div>
            </div>
          </td>
        ))}
        {
          // Render the action button if the actionMenu prop is specified
          actionMenu && (
            <td>
              <button
                type="button"
                className="flex items-center flex-grow-0 mx-auto text-center gap-2"
                onClick={() => {
                  onToggleActionMenu();
                }}
              >
                <HiDotsVertical />
              </button>
              {/* Action Menu */}
              <div className="relative">
                <div
                  className={cx('absolute right-[3vw] top-0 h-fit transition-all', {
                    'invisible opacity-0': !showActionMenu,
                  })}
                  ref={actionMenuRef}
                >
                  {React.cloneElement(actionMenu, { data })}
                </div>
              </div>
            </td>
          )
        }
      </tr>
    );
  }
);

const propTypes = {
  // We don't know what the shape of the object will be, so we can't specify it
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showCheckbox: PropTypes.bool,
  columnKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  centerColumns: PropTypes.arrayOf(PropTypes.string),
  headings: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.bool,
  actionMenu: PropTypes.node,
  showActionMenu: PropTypes.bool,
  onToggleActionMenu: PropTypes.func,
  onChange: PropTypes.func,
};

BaseTableRow.propTypes = propTypes;

export default BaseTableRow;