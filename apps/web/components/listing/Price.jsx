import PropTypes from 'prop-types';

const Price = ({ price, unitPrice }) => (
  <h1 className="text-3xl font-bold">
    S{new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(price)}
    {unitPrice && <span className="text-2xl font-normal">/unit</span>}
  </h1>
);

Price.propTypes = {
  unitPrice: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
};

export default Price;
