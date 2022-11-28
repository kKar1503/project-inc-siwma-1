import PropTypes from 'prop-types';
import cx from 'classnames';

const BaseTableHeader = ({ showCheckbox, headingColor, centerColumns, headerGroups }) => {
  headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {showCheckbox && <th className={cx('top-0 sticky rounded-none z-20', headingColor)}> </th>}
      {headerGroup.headers.map((column) => (
        <th
          {...column.getHeaderProps()}
          // Center the heading if it exists in the centerColumns array
          className={cx(
            'top-0 sticky rounded-none text-white z-20',
            // { 'text-center': centerColumns ? centerColumns.includes(heading) : false },
            headingColor
          )}
        >
          {column.render('Header')}
        </th>
      ))}
      {/* {
      // Render a actions column if the actionMenu prop is provided
      showActionsColumn && (
        <th
          className={cx('top-0 sticky rounded-none text-white z-20 text-center', headingColor)}
        >
          Actions
        </th>
      )
    } */}
    </tr>
  ));
};

const propTypes = {
  showCheckbox: PropTypes.bool.isRequired,
  headingColor: PropTypes.string.isRequired,
  centerColumns: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  headerGroups: PropTypes.array,
};

BaseTableHeader.propTypes = propTypes;

export default BaseTableHeader;
