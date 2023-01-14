import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isOptional: PropTypes.bool,
};

/**
 * Input is a component that renders an input field.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Input = ({ text, type, value, onChange,isOptional }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text mt-31 text-xl font-bold">{text}</span>
    </label>
    {type === 'textarea' ? (
      <textarea
        id="description"
        className="textarea h-24 leading-normal"
        placeholder={`${text} of listing... ${isOptional ? '(Optional)' : ''}`}
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

Input.propTypes = propTypes;

export default Input;
