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
      <option key={item}>{item}</option>
    ))}
  </select>
);

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;
