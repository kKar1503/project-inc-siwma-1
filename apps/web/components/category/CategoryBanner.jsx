// Import prop types
import PropTypes from 'prop-types';

const CategoryBanner = ({ img, name }) => (
  <div
    style={{
      backgroundImage: `url("${img}")`,
    }}
    className="object-scale-down w-full rounded-lg h-64 bg-cover"
  >
    ** Insert search bar here **
  </div>
);

CategoryBanner.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};

export default CategoryBanner;
