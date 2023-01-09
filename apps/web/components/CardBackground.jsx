import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

export default CardBackground;
