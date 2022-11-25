import cx from 'classnames';
import PropTypes from 'prop-types';

/**
 * Wrapper component for a react hook form textarea input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormTextArea = ({
  register,
  isErrored,
  name,
  label,
  placeholder,
  customValidation,
  required,
  success,
  className,
  style,
}) => {
  // Hooks inputs to using react form hook
  const hookInput = (inputName, inputLabel, options) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      maxLength: { value: 255, message: `${inputLabel} can only be 255 characters long` },
      ...options,
    });

  return (
    <textarea
      className={cx(className, 'textarea textarea-bordered h-32', {
        'textarea-error': isErrored,
        'textarea-success': success,
      })}
      placeholder={placeholder || label}
      style={style}
      {...hookInput(name, label, customValidation)}
    />
  );
};

const propTypes = {
  register: PropTypes.func.isRequired,
  isErrored: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation: PropTypes.object,
  required: PropTypes.bool,
  success: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormTextArea.propTypes = propTypes;

export default FormTextArea;
