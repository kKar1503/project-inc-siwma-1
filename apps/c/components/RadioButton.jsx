/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * RadioButton is a component that renders a radio button.
 * @params {Array} options - The options to be displayed in the radio button.
 * @returns {JSX.Element}
 * @constructor - RadioButton
 */
const RadioButton = ({ options }) => {
  const [choice, setChoice] = React.useState('');

  const onChange = async (event) => {
    setChoice(event.target.value);
  };

  return (
    <>
      <label htmlFor="condition" className="label">
        <span className="label-text mt-3 text-xl font-bold">Condition</span>
      </label>
      <div id="condition" className="btn-group">
        {options.map((option) => (
          <input
            type="radio"
            name="options"
            key={option}
            data-title={`${option}`}
            value={`${option}`}
            className="btn btn bg-white border-primary text-primary hover:bg-primary hover:text-primary-content"
            onChange={onChange}
            defaultChecked
          />
        ))}
      </div>
      {choice}
    </>
  );
};

RadioButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RadioButton;
