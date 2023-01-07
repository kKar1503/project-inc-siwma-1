import PropTypes from 'prop-types';
import cx from 'classnames';

const BaseTableHeader = ({
  showCheckbox,
  headingColor,
  headings,
  centerColumns,
  showActionsColumn,
}) => (
  <tr>
    {showCheckbox && <th className={cx('top-0 sticky rounded-none z-20', headingColor)}> </th>}
    {headings.map((heading) => (
      <th
        key={heading}
        // Center the heading if it exists in the centerColumns array
        className={cx(
          'top-0 sticky rounded-none text-white z-20',
          { 'text-center': centerColumns ? centerColumns.includes(heading) : false },
          headingColor
        )}
      >
        {heading}
      </th>
    ))}
    {
      // Render a actions column if the actionMenu prop is provided
      showActionsColumn && (
        <th className={cx('top-0 sticky rounded-none text-white z-20 text-center', headingColor)}>
          Actions
        </th>
      )
    }
  </tr>
);

const propTypes = {
  showCheckbox: PropTypes.bool.isRequired,
  headingColor: PropTypes.string.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  centerColumns: PropTypes.arrayOf(PropTypes.string),
  showActionsColumn: PropTypes.bool,
};

BaseTableHeader.propTypes = propTypes;

export default BaseTableHeader;
