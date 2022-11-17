// Import prop types
import PropTypes from 'prop-types';

const CategoryBanner = ({ img, name }) => (
  <div
    style={{
      backgroundImage: `url("${img}")`,
      backgroundSize: 'cover',
    }}
    className="w-full rounded-lg h-full"
  >
    ** Insert search bar here **
  </div>
);

CategoryBanner.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};

export default CategoryBanner;
