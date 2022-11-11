import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/* selectedColor is the color of the button when it is selected.
When it is not selected, it is black.
*/

const TableButton = ({ index, selectedIndex, setSelectedIndex, selectedColor, styles }) => (
  <button
    className={cx(
      'btn px-4 py-2 text-white rounded-none border-none',
      styles,
      index === selectedIndex ? selectedColor : 'bg-black',
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
  styles: PropTypes.string,
};

export default TableButton;
