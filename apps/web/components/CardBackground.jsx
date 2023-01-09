import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const CardBackground = ({ className, children }) => (
  <div
    className={cx('card bg-neutral-content shadow-xl', {
      [className]: className,
    })}
  >
    <div className="card-body">{children}</div>
  </div>
);

CardBackground.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CardBackground;
