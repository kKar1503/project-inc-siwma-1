import PropTypes from 'prop-types';

const Rating = ({ rating }) => (
  <div className="rating">
    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
    <input name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  </div>
);

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
