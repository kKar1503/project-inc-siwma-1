import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown is a component that renders a dropdown.
 * @param {Array} items - The items to be displayed in the dropdown.
 * @returns {JSX.Element}
 * @constructor - Dropdown
 */
const Dropdown = ({ items, onChangeValue }) => (
  <select
    onChange={onChangeValue}
    className="select w-full text-center focus:outline-none"
    defaultValue="Category"
  >
    <option disabled>Category</option>
    {items.map((item) =>
      item.subcategory ? (
        <optgroup key={item.id} label={item.category}>
          {item.subcategory.map((subItem) => (
            <option key={subItem.id}>{subItem.category}</option>
          ))}
        </optgroup>
      ) : (
        <option key={item.id}>{item.category}</option>
      )
    )}
  </select>
);

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      category: PropTypes.string,
      subcategory: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          category: PropTypes.string,
        })
      ),
    })
  ),
  onChangeValue: PropTypes.func.isRequired,
};

export default Dropdown;
