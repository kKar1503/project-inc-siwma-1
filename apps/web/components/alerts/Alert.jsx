import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AlertIcon from './AlertIcon';

const propTypes = {
  level: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

/**
 * NOTE: Do not change this to a concated string of `alert-${level}`.
 * Tailwind will eliminate all unused classes, and this will cause the
 * class to be removed from the final CSS bundle. Thus, the styling will
 * not work.
 *
 * @param {'info' | 'success' | 'warning' | 'error'} level
 * @returns
 */
export function resolveClassnameForLevel(level) {
  switch (level) {
    case 'info':
      return 'alert-info';
    case 'success':
      return 'alert-success';
    case 'warning':
      return 'alert-warning';
    case 'error':
      return 'alert-error';
    default:
      return '';
  }
}

/**
 *
 * Following SGDS guidelines for form fields:
 * https://designsystem.tech.gov.sg/components/alert
 *
 * Specs:
 * - Icon and message 16px apart (gap-4)
 *
 * Uncontrollable Specs:
 * - Alert should have a padding of 24px.
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Alert = ({ level, message, className }) => (
  <div className={cx(className, 'alert', resolveClassnameForLevel(level))}>
    <div className="flex flex-row gap-4">
      <AlertIcon level={level} />
      <p>{message}</p>
    </div>
  </div>
);

Alert.propTypes = propTypes;

export default Alert;
