// Import prop types
import PropTypes from 'prop-types';

const CategoryListingItem = ({ img, name, href }) => (
  <div className="card relative">
    <a href={href}>
      <picture>
        {/* Actual image */}
        <img src={img} alt={name} className="aspect-square object-cover h-[150px]" />

        {/* Overlay gradient */}
        <div className="bg-gradient-to-b from-transparent to-black/40 w-full h-full z-10 absolute top-0 left-0" />
      </picture>

      {/* Category text */}
      <p className="absolute z-10 bottom-0 text-center w-full mb-3 text-white">{name}</p>
    </a>
  </div>
);

CategoryListingItem.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
};

export default CategoryListingItem;
