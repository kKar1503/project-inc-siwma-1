import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/**
 * Dropdown is a component that renders a dropdown.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Dropdown = ({ items }) => (
  <select className="select w-full text-center" defaultValue="Category">
    <option disabled>Category</option>
    {items.map((item) => (
      <option className="hover:bg-primary-focus" key={item}>
        {item}
      </option>
    ))}
  </select>
);

Dropdown.propTypes = propTypes;

export default Dropdown;
