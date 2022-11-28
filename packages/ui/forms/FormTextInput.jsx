import cx from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormInput = ({
  name,
  label,
  placeholder,
  customValidation,
  required,
  success,
  className,
  style,
}) => {
  // Use form context
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Hooks inputs to using react form hook
  const hookInput = (inputName, inputLabel, options) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      maxLength: { value: 255, message: `${inputLabel} can only be 255 characters long` },
      ...options,
    });

  return (
    <input
      type="text"
      className={cx(className, 'input-group input input-bordered', {
        'input-error': errors[name],
        'input-success': success,
      })}
      style={style}
      placeholder={placeholder || label}
      {...hookInput(name, label, customValidation)}
    />
  );
};

const propTypes = {
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

FormInput.propTypes = propTypes;

export default FormInput;
