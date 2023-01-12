import PropTypes from 'prop-types';
import React from 'react';

const AlertManager = ({ alerts, onRequestClose, maxAlerts }) => (
  <div className="absolute bottom-0 right-0 m-6 min-w-min">
    <div className="relative flex flex-col-reverse gap-3">
      {alerts.map((e, index) => {
        // Request to close the first Alert if the number of alerts being rendered exceeds the number of max alerts
        // Max number of alerts defaults to 3
        if (index + 1 > (maxAlerts || 3)) {
          // Attempt to close the first alert
          onRequestClose(0);
        }

        // Render the Alert component
        return React.cloneElement(e, {
          key: `alert-${index}`,
          onRequestClose: () => onRequestClose(index),
        });
      })}
    </div>
  </div>
);

const propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.node).isRequired,
  onRequestClose: PropTypes.func,
  maxAlerts: PropTypes.number,
};

AlertManager.propTypes = propTypes;

export default AlertManager;