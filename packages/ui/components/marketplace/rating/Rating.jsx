import PropTypes from 'prop-types';
import { useState } from 'react';

const Rating = ({ rating }) => {
  const [solid] = useState(Math.floor(rating));
  const [half] = useState(rating % 1 <= 0.4 ? 0 : 1);

  return (
    <div className="rating">
      {/* Stars: */}
      {/* <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
      <input name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" /> */}

      <div className="rating">
        {[...Array(solid)].map(() => (
          <p>1</p>
        ))}

        {[...Array(half)].map(() => (
          <p>0.5</p>
        ))}
      </div>

      <br />

      {rating}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
