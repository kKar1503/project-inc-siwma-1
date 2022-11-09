import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

/**
 * Input is a component that renders an input field.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Input = ({ text, type }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text mt-31 text-xl font-bold">{text}</span>
    </label>
    {type === 'textarea' ? (
      <textarea id="description" className="textarea h-24" placeholder={`${text} of listing...`} />
    ) : (
      <input
        id="input"
        type="text"
        placeholder={`${text} of listing...`}
        className="input w-full"
      />
    )}
  </div>
);

Input.propTypes = propTypes;

export default Input;
