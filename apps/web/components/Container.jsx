// Import prop types
import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="mx-2 md:mx-5 max-w-[1024px] lg:mx-auto">{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
