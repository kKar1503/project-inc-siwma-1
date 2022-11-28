import PropTypes from 'prop-types';

const Error404Page = ({ errorMessage }) => (
  <div className="hero min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-2xl">{errorMessage}</p>
      </div>
    </div>
  </div>
);

Error404Page.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default Error404Page;
