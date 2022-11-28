import PropTypes from 'prop-types';
import cx from 'classnames';

const BaseTableHeader = ({ showCheckbox, headingColor, headerGroups }) =>
  headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {showCheckbox && <th className={cx('top-0 sticky rounded-none', headingColor)}> </th>}
      {headerGroup.headers.map((column) => (
        <th
          {...column.getHeaderProps()}
          className={cx('top-0 sticky rounded-none text-white', headingColor)}
        >
          {column.render('Header')}
        </th>
      ))}
    </tr>
  ));

const propTypes = {
  showCheckbox: PropTypes.bool.isRequired,
  headingColor: PropTypes.string.isRequired,
  centerColumns: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  headerGroups: PropTypes.array,
};

BaseTableHeader.propTypes = propTypes;

export default BaseTableHeader;
