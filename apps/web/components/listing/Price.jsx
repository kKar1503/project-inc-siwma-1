import PropTypes from 'prop-types';

const Price = ({ price }) => <h1 className="text-3xl font-bold">S${price}</h1>;

Price.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Price;
