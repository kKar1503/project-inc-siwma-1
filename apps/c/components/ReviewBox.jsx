import PropTypes from 'prop-types';

const ReviewBox = ({ name, description, pfp }) => (
  <div className="border border-gray-600 mt-6 w-11/12">
    <div className="m-3 flex flex-row">
      <div className="avatar w-1/12">
        <div className="w-16 rounded-full">
          {/* daisyui implementation of avatar */}
          <img alt="profilepic" src={pfp} />
        </div>
      </div>
      <div>
        <p>{name}</p>
        {/* will need to add a rating prop once we unhardcode this 💩 */}
        <div className=" rating rating-xs h-min">
          <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
        </div>
      </div>
    </div>
    <p className="m-3">{description}</p>
  </div>
);

ReviewBox.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
};

export default ReviewBox;
