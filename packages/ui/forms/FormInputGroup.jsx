import PropTypes from 'prop-types';
import cx from 'classnames';
import React from 'react';
import FormError from './FormError';

/**
 * Input group that contains a label, input and error message
 * @param {string} label The label to be used for the input
 * @param {string} name The name of the input
 * @param {boolean} required Whether or not the input is a required field
 * @param {React.ReactNode} children Input component
 * @param {boolean} hideError Whether or not to hide the error text (Useful for if you want to display the error outside of the input group component)
 * @param {boolean} success Whether or not the form submission was successful (Used to determine whether to show a success response)
 * @param {boolean} isLoading Whether or not the component is currently in a loading state
 * @param {string} className Custom classes for the component
 * @param {object} style Custom styling for the component
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns An input group that contains a label, input and error message
 */
const FormInputGroup = ({
  label,
  name,
  required,
  children,
  hideError,
  success,
  isLoading,
  className,
  style,
}) => (
  <div className={cx(className, 'form-control')} style={style}>
    <div className="label pt-0">
      <span className="label-text">
        {label} {!required ? '(optional)' : ''}
      </span>
    </div>
    {
      // Clones the element to pass props down to it
      React.cloneElement(children, { label, name, required, success, isLoading })
    }
    {
      // Show the error if hideError is not set
      !hideError && <FormError inputName={name} isLoading={isLoading} />
    }
  </div>
);

const propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
  hideError: PropTypes.bool,
  success: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormInputGroup.propTypes = propTypes;

export default FormInputGroup;
