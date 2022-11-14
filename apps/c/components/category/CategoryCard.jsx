// Import prop types
import PropTypes from 'prop-types';

const CategoryCard = ({ img, name, href }) => (
  <div className="card shadow-md w-1/6">
    <a href={href}>
      <picture className="flex place-content-center">
        <img className="h-[150px] m-5" src={img} alt={name} />
      </picture>

      {/* Listing content */}
      <div className="p-2 pb-4">
        <p className="font-bold">{name}</p>
      </div>
    </a>
  </div>
);

CategoryCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
};

export default CategoryCard;
