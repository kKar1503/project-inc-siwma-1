// Import prop types
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
}

/**
 * Container is a component that renders a container.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Container = ({ children }) => (
  <div className="px-2 md:px-6 lg:mx-auto lg:max-w-[1440px]">{children}</div>
);

Container.propTypes = propTypes;

export default Container;
