import cx from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Wrapper component for a react hook form textarea input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormTextArea = ({
  name,
  label,
  placeholder,
  customValidation,
  maxLength,
  required,
  success,
  isLoading,
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
      maxLength: {
        value: maxLength || 255,
        message: `${inputLabel} can only be ${maxLength || 255} characters long`,
      },
      ...options,
    });

  return isLoading ? (
    <Skeleton className="h-32" />
  ) : (
    <textarea
      className={cx(className, 'textarea textarea-bordered h-32', {
        'textarea-error': errors[name],
        'textarea-success': success,
      })}
      placeholder={placeholder || label}
      style={style}
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
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  success: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormTextArea.propTypes = propTypes;

export default FormTextArea;
