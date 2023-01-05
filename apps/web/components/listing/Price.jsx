import PropTypes from 'prop-types';

/**
 * A component that displays a price
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Price = ({ price }) => <h1 className="text-3xl font-bold">S${price}</h1>;

const propTypes = {
  price: PropTypes.number.isRequired,
};

Price.propTypes = propTypes;

export default Price;
