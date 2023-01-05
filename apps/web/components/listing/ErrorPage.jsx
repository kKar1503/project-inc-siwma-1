import PropTypes from 'prop-types';

/**
 * A component that displays an error page
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const ErrorPage = ({ errorCode, errorMessage }) => (
  <div className="hero min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-8xl font-bold">{errorCode}</h1>
        <p className="text-2xl">{errorMessage}</p>
      </div>
    </div>
  </div>
);

const propTypes = {
  errorCode: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

ErrorPage.propTypes = propTypes;

export default ErrorPage;
