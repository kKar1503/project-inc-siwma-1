import PropTypes from 'prop-types';
import { useState } from 'react';
import FullStar from './FullStar';
import HalfStar from './HalfStar';
import RemainingStar from './RemainingStar';

const Rating = ({ rating }) => {
  const [solid] = useState(Math.floor(rating));
  const [half] = useState(rating % 1 <= 0.4 ? 0 : 1);

  return (
    <div className="flex items-center gap-2">
      {/* Stars: */}
      <div className="rating rating-sm rating-half">
        {[...Array(solid)].map(() => (
          <FullStar key="solid" />
        ))}

        {[...Array(half)].map(() => (
          <HalfStar key="half" />
        ))}

        {[...Array(Math.max(0, 5 - solid - half))].map(() => (
          <RemainingStar key="remaining" />
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
