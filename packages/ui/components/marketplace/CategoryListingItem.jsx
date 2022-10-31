// Import prop types
import PropTypes from 'prop-types';

const CategoryListingItem = ({ img, name, href }) => (
  <div>
    <a href={href}>
      {/* TODO: Implement image and text overlap on top of each other (use relative positioning) */}
      <picture>
        <img src={img} alt={name} />
      </picture>
      <p>{name}</p>
    </a>
  </div>
);

CategoryListingItem.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
};

export default CategoryListingItem;
