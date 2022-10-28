/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import '../styles/globals.css';

const propTypes = {
  // If getServerSideProps is used, we cannot guarantee the shape of the page props
  // as all page props are passed down through this component.
  // pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};

/**
 * TODO: NextJS 13 Future migrations with layouts.
 * NextJS 13 offers a new layout system that will allow us to have a more
 * flexible layout system.
 *
 * As of this writing, NextJS just released and supabase is still using NextJS 12.
 * As such, we will use the old way of doing layouts until we migrate.
 *
 * @type {import('next').NextPage<PropTypes.InferProps<typeof propTypes>>}
 */
const MyApp = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

MyApp.propTypes = propTypes;

export default MyApp;
