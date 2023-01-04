// Import prop types
import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="px-2 lg:mx-auto lg:max-w-[1440px]">{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
