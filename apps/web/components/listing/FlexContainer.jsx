import PropTypes from 'prop-types';

/**
 * A component that displays a flex container
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const FlexContainer = ({ children, className }) => (
  <div className={`flex ${className}`}>{children}</div>
);

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FlexContainer.propTypes = propTypes;

export default FlexContainer;
