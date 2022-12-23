import PropTypes from 'prop-types';

/**
 * A component that gives a grey background to the children elements
 * @param {JSX.Element} children The children elements to be rendered inside the CardBackground
 * @param {string} className The className to be applied to the body of the CardBackground
 * @returns {JSX.Element}
 */
const CardBackground = ({ children, className }) => (
  <div className="card w-auto bg-neutral-content shadow-xl">
    <div className={`card-body space-y-2 ${className}`}>{children}</div>
  </div>
);

CardBackground.propTypes = {
  /**
   * The children elements to be rendered inside the CardBackground
   * @default null
   * @type {JSX.Element}
   * @example
   * <CardBackground>
   * <h1>CardBackground</h1>
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
   * @type {string}
   * @example
   * <CardBackground className="p-4">
   *  <h1>CardBackground</h1>
   * </CardBackground>
   * // The above example will render a CardBackground with a padding of 4
   * // on all sides
   * // The className can be used to add any custom styling to the CardBackground
   * // body
   */
  className: PropTypes.string,
};

export default CardBackground;
