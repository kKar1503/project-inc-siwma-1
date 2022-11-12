import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/* selectedColor is the color of the button when it is selected.
When it is not selected, it is black.
*/

const TableButton = ({ index, selectedIndex, setSelectedIndex, selectedColor, className }) => (
  <button
    className={cx(
      'btn px-4 py-2 text-white rounded-none border-none',
      index === selectedIndex ? selectedColor : 'bg-black',
      className,
    )}
    onClick={() => setSelectedIndex(index)}
  >
    {index + 1}
  </button>
);

TableButton.propTypes = {
  index: PropTypes.number,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func,
  selectedColor: PropTypes.string,
  className: PropTypes.string,
};

export default TableButton;
