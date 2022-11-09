// Import prop types
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Container = ({ children }) => <div className="mx-2 md:mx-5">{children}</div>;

Container.propTypes = propTypes;

export default Container;
