/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import '@inc/styles/globals.css';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};

export default MyApp;
