// Import prop types
import PropTypes from 'prop-types';
import Rating from './rating/Rating';

const ProductListingItem = ({ img, name, rating, href }) => (
  <div className="card shadow-md">
    <a href={href}>
      <picture>
        {/* ! The reason why the image below is 150px in height is because smaller images will be zoomed in to fit the height (this is so images > 150px will zoom and crop) */}
        <img className="aspect-square object-cover h-[150px]" src={img} alt={name} />
      </picture>

      {/* Listing content */}
      <div className="p-2 pb-4">
        <p className="font-bold">{name}</p>
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
