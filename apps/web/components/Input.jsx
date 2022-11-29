import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input is a component that renders an input field.
 * @param {string} text - The text to be displayed on the label.
 * @param {string} type - The type of input field. (normal input/textarea)
 * @returns {JSX.Element}
 * @constructor - Input
 */
const Input = ({ text, type, value, onChange }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text mt-31 text-xl font-bold">{text}</span>
    </label>
    {type === 'textarea' ? (
      <textarea
        id="description"
        className="textarea h-24"
        placeholder={`${text} of listing...`}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        id="input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`${text} of listing...`}
        className="input w-full"
      />
    )}
  </div>
);

Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
