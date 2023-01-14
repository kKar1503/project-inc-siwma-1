import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const propTypes = {
  className: PropTypes.string,
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
const Input = ({ className, text, type, value, onChange, isOptional }) => (
  <div className={cn(className, 'form-control')}>
    <label className="label">
      <span className="label-text text-xl font-bold">{text}</span>
    </label>
    {type === 'textarea' ? (
      <textarea
        id="description"
        className="textarea h-[100px] md:h-[150px] lg:h-[200px] leading-normal"
        maxLength={1500}
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
        placeholder={`${text} of listing... ${isOptional ? '(Optional)' : ''}`}
        className="input w-full"
      />
    )}
  </div>
);

Input.propTypes = propTypes;

export default Input;
