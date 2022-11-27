import cx from 'classnames';
import PropTypes from 'prop-types';
import TableButton from './TableButton';

/**
 * Renders pagination buttons for table components
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @param {number} rows The number of rows being rendered by the table
 * @param {number} rowsPerPage The number of rows being rendered per page by the table
 * @param {number} selectedIndex The pagination index currently selected
 * @param {(index)} onChange The function to invoke with the new index selected
 * @param {boolean} isLoading Whether or not the table element is in a loading state
 * @param {string} className Custom classnames for the pagination buttons
 * @param {object} style Custom styles for the pagination buttons
 * @returns Pagination buttons for use with a table component
 */
const TablePagination = ({
  rows,
  rowsPerPage,
  selectedIndex,
  onChange,
  isLoading,
  className,
  style,
}) => {
  // Checks if the data is still being fetched from supabase
  if (isLoading) {
    // Render a disabled pagination button
    return (
      <TableButton
        index={0}
        selectedIndex={selectedIndex}
        setSelectedIndex={onChange}
        selectedColor="bg-primary"
        className={cx('rounded-lg hover:bg-primary', className)}
        style={style}
      />
    );
  }

  // Data has already been fetched from supabase, determine the number of pagination buttons to be rendered
  const buttonCount = rows / rowsPerPage;

  // Initialise an array of buttons
  const buttons = [];

  // Render x number of buttons
  for (let i = 0; i < buttonCount; i++) {
    buttons.push(
      <TableButton
        index={i}
        key={`pagination-btn-${i}`}
        selectedIndex={selectedIndex}
        setSelectedIndex={onChange}
        selectedColor="bg-primary"
        // Make the left side of the first button and the right side of the last button rounded,
        // also make the entire button rounded if it is the only button
        className={cx(
          'hover:bg-primary',
          {
            'rounded-l-lg': i === 0,
            'rounded-r-lg': i >= buttonCount - 1,
          },
          className
        )}
        style={style}
      />
    );
  }

  // Return the result
  return buttons;
};

const propTypes = {
  rows: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

TablePagination.propTypes = propTypes;

export default TablePagination;
