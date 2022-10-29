// Import prop types
import PropTypes from 'prop-types';
import Rating from './rating/Rating';

const ProductListingItem = ({ img, name, rating, href }) => (
  <div>
    <a href={href}>
      <picture>
        <img src={img} alt={name} />
      </picture>

      <p>{name}</p>
      {/* TODO: Implement rating from Daisy UI */}
      <Rating rating={rating} />
    </a>
  </div>
);

ProductListingItem.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  href: PropTypes.string,
};

export default ProductListingItem;
