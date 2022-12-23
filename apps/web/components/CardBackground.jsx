import PropTypes from 'prop-types';

/**
 * A component that gives a grey background to the children elements
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const CardBackground = ({ children, className }) => (
  <div className="card w-auto bg-neutral-content shadow-xl">
    <div className={`card-body space-y-2 ${className}`}>{children}</div>
  </div>
);

const propTypes = {
  /**
   * The children elements to be rendered inside the CardBackground
   * @default null
   * @example
   * <CardBackground>
   *   <h1>CardBackground</h1>
   * </CardBackground>
   * // The above example will render a CardBackground with a h1 tag
   * // inside it
   * // The children can be used to add any custom elements to the CardBackground
   * // body
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node.isRequired]),

  /**
   * The className to be applied to the body of the CardBackground
   * @default ''
   * @example
   * <CardBackground className="p-4">
   *   <h1>CardBackground</h1>
   * </CardBackground>
   * // The above example will render a CardBackground with a padding of 4
   * // on all sides
   * // The className can be used to add any custom styling to the CardBackground
   * // body
   */
  className: PropTypes.string,
};

CardBackground.propTypes = propTypes;

export default CardBackground;
