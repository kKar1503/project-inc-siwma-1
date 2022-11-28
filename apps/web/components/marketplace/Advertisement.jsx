import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Advertisement = ({ data }) => {
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
        <label htmlFor={`modal-${data.id}`} className="image">
          <picture>
            <img
              src="https://images.unsplash.com/photo-1598638567141-696be94b464a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              className="object-cover"
              alt="Banner"
            />
          </picture>
        </label>
      </div>

      <input type="checkbox" id={`modal-${data.id}`} className="modal-toggle" />
      <label htmlFor={`modal-${data.id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="placeholder">
          <h3 className="text-lg font-bold text-center">{data.id}</h3>
          <p className="py-4">{data.description}</p>
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
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }),
};

export default Advertisement;
