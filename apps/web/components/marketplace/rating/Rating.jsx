import PropTypes from 'prop-types';
import { useState } from 'react';

const FullStar = () => (
  <>
    <input
      disabled
      type="radio"
      name="rating-10"
      className="bg-orange-500 mask mask-star-2 mask-half-1"
    />
    <input
      disabled
      type="radio"
      name="rating-10"
      className="bg-orange-500 mask mask-star-2 mask-half-2"
    />
  </>
);

const HalfStar = () => (
  <>
    <input
      disabled
      type="radio"
      name="rating-10"
      className="bg-orange-500 mask mask-star-2 mask-half-1"
    />

    <input
      disabled
      type="radio"
      name="rating-10"
      className="bg-orange-500/40 mask mask-star-2 mask-half-2"
    />
  </>
);

const RemainingStar = () => (
  <>
    <input
      disabled
      type="radio"
      name="rating-10"
      className="bg-orange-500/40 mask mask-star-2 mask-half-1"
    />

    <input
      disabled
      type="radio"
      name="rating-10"
      className="bg-orange-500/40 mask mask-star-2 mask-half-2"
    />
  </>
);

const Rating = ({ rating }) => {
  const [solid] = useState(Math.floor(rating));
  const [half] = useState(rating % 1 <= 0.4 ? 0 : 1);

  return (
    <div className="flex items-center gap-2">
      {/* Stars: */}
      <div className="rating rating-sm rating-half">
        {[...Array(solid)].map(() => (
          <FullStar />
        ))}

        {[...Array(half)].map(() => (
          <HalfStar />
        ))}

        {[...Array(5 - solid - half)].map(() => (
          <RemainingStar />
        ))}
      </div>

      <span className="text-sm">({rating})</span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
