import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

/**
 * CardBackground is a component that renders a card background.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const CardBackground = ({ children }) => (
  <div className="card w-auto bg-neutral-content shadow-xl">
    <div className="card-body">{children}</div>
  </div>
);

CardBackground.propTypes = propTypes;

export default CardBackground;
