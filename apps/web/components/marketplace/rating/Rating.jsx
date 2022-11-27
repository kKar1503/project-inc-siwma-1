import PropTypes from 'prop-types';
import FullStar from './FullStar';
import HalfStar from './HalfStar';
import RemainingStar from './RemainingStar';

/**
 * Rating is a component that shows a rating on the screen.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */

const Rating = ({ rating }) => {
  const solid = Math.floor(rating);
  const half = rating % 1 <= 0.4 ? 0 : 1;

  return (
    <div className="flex items-center gap-2">
      {/* Stars: */}

      {/* TODO: Need a unique-random key */}
      <div className="rating rating-sm rating-half">
        {[...Array(solid)].map((_, index) => (
          <FullStar key={index} />
        ))}

        {[...Array(half)].map((_, index) => (
          <HalfStar key={index} />
        ))}

        {[...Array(Math.max(0, 5 - solid - half))].map((_, index) => (
          <RemainingStar key={index} />
        ))}
      </div>

      {/* <span className="text-sm">({rating})</span> */}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
