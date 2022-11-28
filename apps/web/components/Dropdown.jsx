import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown is a component that renders a dropdown.
 * @param {Array} items - The items to be displayed in the dropdown.
 * @returns {JSX.Element}
 * @constructor - Dropdown
 */
const Dropdown = ({ items }) => (
  <select className="select w-full text-center" defaultValue="Category">
    <option disabled>Category</option>
    {items.map((item) => (
      <optgroup key={item.id} label={item.category}>
        {item.subcategory.map((subItem) => (
          <option key={subItem.id}>{subItem.category}</option>
        ))}
      </optgroup>
    ))}
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
};

export default Dropdown;
