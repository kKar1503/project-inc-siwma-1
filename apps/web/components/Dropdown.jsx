import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const propTypes = {
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
  isOptional: PropTypes.bool,
}

/**
 * Dropdown is a component that renders a dropdown.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Dropdown = ({ classNames, items, onChangeValue, defaultValue, itemType,isOptional }) => (
  <select onChange={onChangeValue} className={cn('select', 'w-full', 'max-w-xs', classNames)} defaultValue="Category">
    <option hidden value={undefined} selected>
      {defaultValue}
    </option>
    <option disabled value={undefined}>
      {defaultValue}
    </option>
    {isOptional && <option value="Category">None</option>}
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

Dropdown.propTypes = propTypes;

export default Dropdown;
