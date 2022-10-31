import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ text, height }) => (
  <div className="form-control w-full max-w-xs pb-5">
    <label className="label">
      <span className="label-text">{text}</span>
    </label>
    <input
      type="text"
      placeholder={`Enter ${text}`}
      id="input"
      className={height ? `input w-full max-w-xs h-${height}` : `input w-full max-w-xs`}
    />
  </div>
);

Input.propTypes = {
  text: PropTypes.string.isRequired,
  height: PropTypes.number,
};

export default Input;
