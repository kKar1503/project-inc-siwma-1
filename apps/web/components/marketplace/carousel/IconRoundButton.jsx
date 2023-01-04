import PropTypes from 'prop-types';

const IconRoundButton = ({ onClick, icon, className }) => (
  <button
    onClick={onClick}
    className={`btn btn-circle btn-md bg-white/50 border hover:bg-white/80 hover:border-gray-900/20 border-gray-900/20 text-gray-500 shadow-lg ${className}`}
  >
    {icon}
  </button>
);

IconRoundButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default IconRoundButton;
