import PropTypes from 'prop-types';
import cx from 'classnames';
import FormError from './FormError';
import FormTextInput from './FormTextInput';
import FormTextArea from './FormTextArea';
import FormImageInput from './FormImageInput';

/**
 * Input group that contains a label, input and error message
 * @param {string} type The input type to be used for this input group
 * @param {string} label The label to be used for the input
 * @param {string} name The name of the input
 * @param {object} customValidation Custom react-hook-form validation to be used against the input
 * @param {string} placeholder Custom placeholder text for the input
 * @param {boolean} required Whether or not the input is a required field
 * @param {boolean} hideError Whether or not to hide the error text (Useful for if you want to display the error outside of the input group component)
 * @param {boolean} success Whether or not the form submission was successful (Used to determine whether to show a success response)
 * @param {{name: [string], format: [string]}} allowedExts File extensions allowed by the file input (Only needed if you specify the type prop to be that of a file input)
 * @param {string} className Custom classes for the component
 * @param {object} style Custom styling for the component
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns An input group that contains a label, input and error message
 */
const FormInputGroup = ({
  type,
  label,
  name,
  customValidation,
  placeholder,
  required,
  hideError,
  success,
  allowedExts,
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
      // Render a text input if the type is text
      (!type || type === 'text') && (
        <FormTextInput
          label={label}
          name={name}
          customValidation={{ ...customValidation }}
          placeholder={placeholder}
          required={required}
          success={success}
        />
      )
    }
    {
      // Render a textarea if the type is textarea
      type && type === 'textarea' && (
        <FormTextArea
          label={label}
          name={name}
          customValidation={{ ...customValidation }}
          placeholder={placeholder}
          required={required}
          success={success}
        />
      )
    }
    {
      // Render a file input if the type is fileinput
      type && type === 'imageUpload' && (
        <FormImageInput
          label={label}
          name={name}
          customValidation={{ ...customValidation }}
          placeholder={placeholder}
          required={required}
          success={success}
          allowedExts={allowedExts}
        />
      )
    }
    {
      // Show the error if hideError is not set
      !hideError && <FormError inputName={name} />
    }
  </div>
);

const propTypes = {
  // The object is massive, its impossible to document its shape
  // eslint-disable-next-line react/forbid-prop-types
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation: PropTypes.object,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  hideError: PropTypes.bool,
  success: PropTypes.bool,
  allowedExts: PropTypes.exact({
    name: PropTypes.arrayOf(PropTypes.string).isRequired,
    format: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormInputGroup.propTypes = propTypes;

export default FormInputGroup;
