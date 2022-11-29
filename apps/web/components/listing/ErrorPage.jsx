import PropTypes from 'prop-types';

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

ErrorPage.propTypes = {
  errorCode: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorPage;
