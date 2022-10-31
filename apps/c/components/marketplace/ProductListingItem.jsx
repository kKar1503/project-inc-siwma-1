// Import prop types
import PropTypes from 'prop-types';
import Rating from './rating/Rating';

const ProductListingItem = ({ img, name, rating, href }) => (
  <div className="card shadow-md">
    <a href={href}>
      <picture>
        <img src={img} alt={name} />
      </picture>

      {/* Listing content */}
      <div className="p-2 pb-4">
        <p className="font-bold">{name}</p>
        {/* TODO: Implement rating from Daisy UI */}
        <Rating rating={rating} />
      </div>
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
