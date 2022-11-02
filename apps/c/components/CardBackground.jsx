import React from 'react';
import PropTypes from 'prop-types';

const CardBackground = ({ children }) => (
  <div className="card w-auto border-2 bg-neutral-content border-red-500 shadow-xl">
    <div className="card-body">{children}</div>
  </div>
);

CardBackground.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

export default CardBackground;
