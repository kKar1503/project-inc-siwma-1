import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Advertisement = ({ company, content }) => {
  // Count the number of clicks of the advertisement banners
  // This is used to determine engagement rate
  // Will be used in the future to determine the ranking of the advertisement in the dashboards
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
    // console.log(count);
  };

  return (
    <>
      <div onClick={handleCount} onKeyPress={handleCount} role="button" tabIndex={0}>
        <label htmlFor="modal" className="image">
          <picture>
            <img
              src="https://via.placeholder.com/1500x500"
              className="object-cover w-full h-[200px]"
              alt="Banner"
            />
          </picture>
        </label>
      </div>

      <input type="checkbox" id="modal" className="modal-toggle" />
      <label htmlFor="modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="placeholder">
          <h3 className="text-lg font-bold text-center">{company}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Show me!
            </label>
          </div>
        </label>
      </label>
    </>
  );
};

Advertisement.propTypes = {
  company: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Advertisement;
