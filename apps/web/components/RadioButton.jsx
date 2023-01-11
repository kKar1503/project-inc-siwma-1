import React from 'react';
import PropTypes from 'prop-types';

/**
 * RadioButton is a component that renders a radio button.
 * @params {Array} options - The options to be displayed in the radio button.
 * @returns {JSX.Element}
 * @constructor - RadioButton
 */
const RadioButton = ({ options, onChangeValue }) => (
  <>
    <label htmlFor="condition" className="label">
      <span className="label-text mt-3 text-xl font-bold">Type of Listing</span>
    </label>
    <div id="condition" className="btn-group w-full">
      {options.map((option) => (
        <input
          type="radio"
          name="options"
          key={option}
          data-title={`${option}`}
          value={`${option}`}
          className="btn w-1/2 bg-white border-primary text-primary hover:bg-primary hover:text-primary-content"
          onChange={onChangeValue}
        />
      ))}
    </div>
  </>
);

RadioButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default RadioButton;
