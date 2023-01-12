import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

/**
 * CardBackground is a component that renders a card with a background.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const CardBackground = ({className, children}) => (
  <div
    className={cx(className, 'card bg-neutral-content shadow-xl')}
  >
    <div className="card-body">{children}</div>
  </div>
);

CardBackground.propTypes = propTypes;

export default CardBackground;
