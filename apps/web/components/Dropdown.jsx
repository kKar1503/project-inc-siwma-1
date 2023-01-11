import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/**
 * Dropdown is a component that renders a dropdown.
 * @param {Array} items - The items to be displayed in the dropdown.
 * @returns {JSX.Element}
 * @constructor - Dropdown
 */
const Dropdown = ({ classNames, items, onChangeValue, defaultValue, itemType }) => (
  <select onChange={onChangeValue} className={cn('select', 'w-full', 'max-w-xs', classNames)} defaultValue="Category">
    <option hidden value={undefined} selected>
      {defaultValue}
    </option>
    <option disabled value={undefined}>
      {defaultValue}
    </option>
    {itemType === 'Object'
      ? items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))
      : items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
  </select>
);

Dropdown.propTypes = {
  classNames: PropTypes.string,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChangeValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  itemType: PropTypes.string,
};

export default Dropdown;
