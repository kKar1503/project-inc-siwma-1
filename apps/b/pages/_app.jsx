/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import '@inc/styles/globals.css';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.propTypes = {
  // If getServerSideProps is used, we cannot guarantee the shape of the page props
  // as all page props are passed down through this component.
  // pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};

export default MyApp;
