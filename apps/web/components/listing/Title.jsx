import PropTypes from 'prop-types';

/**
 * A component that displays a title
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Title = ({ children, title }) => (
  <div className="flex flex-row space-x-4 items-center">
    <h1 className="text-3xl">{title}</h1>
    {children}
  </div>
);

const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

Title.propTypes = propTypes;

export default Title;
