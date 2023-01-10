import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown is a component that renders a dropdown.
 * @param {Array} items - The items to be displayed in the dropdown.
 * @returns {JSX.Element}
 * @constructor - Dropdown
 */
const Dropdown = ({ items, onChangeValue, defaultValue, itemType }) => (
  <select
    onChange={onChangeValue}
    className="select w-full max-w-xs"
    defaultValue="Category"
  >

    <option key="0" disabled>{defaultValue}</option>
    {itemType === 'Object' ? items.map((item) =>
      <option key={item.id} value={item.id}>{item.name}</option>
    ) : items.map((item, index) => 
      <option key={index} value={item}>{item}</option>
    )}
  </select>
);

Dropdown.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    PropTypes.arrayOf(
      PropTypes.string
    )
  ]),
  onChangeValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  itemType: PropTypes.string,
};

export default Dropdown;
