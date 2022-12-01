// Import prop types
import PropTypes from 'prop-types';

const Container = ({ children }) => <div className="mx-5 md:mx-10">{children}</div>;

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
