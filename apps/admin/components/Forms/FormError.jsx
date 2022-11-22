import PropTypes from 'prop-types';
import cx from 'classnames';

/**
 * Displays an error message
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns Displays an error message (if any)
 */
const FormError = ({ error, className, style }) => (
  <div className={cx(className, 'w-full text-right h-5 my-1')} style={style}>
    <p className="text-error text-sm">{error ? error.message : ''}</p>
  </div>
);

const propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormError.propTypes = propTypes;

export default FormError;
