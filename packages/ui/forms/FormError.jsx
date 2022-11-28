import PropTypes from 'prop-types';
import cx from 'classnames';
import { useFormContext } from 'react-hook-form';

/**
 * Displays an error message
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns Displays an error message (if any)
 */
const FormError = ({ inputName, error, className, style }) => {
  // -- Obtain the error message to be displayed -- //
  // Initialise the error message
  let errorMessage;

  // Retrieve form context if the component is not in a loading state
  const {
    formState: { errors },
  } = useFormContext();

  // Check if a name of a input was provided and the input is errored
  if (inputName && errors[inputName]) {
    // Input name provided, retrieve the error message from the input
    errorMessage = errors[inputName].message;
  }

  // Check if an error message was explicitly provided
  if (error) {
    // A custom error message was provided
    errorMessage = error;
  }

  return (
    <div className={cx(className, 'w-full text-right h-5 my-1')} style={style}>
      <p className="text-error text-sm">{errorMessage}</p>
    </div>
  );
};

const propTypes = {
  inputName: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormError.propTypes = propTypes;

export default FormError;
