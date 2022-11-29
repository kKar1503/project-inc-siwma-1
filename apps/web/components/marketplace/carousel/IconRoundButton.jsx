import PropTypes from 'prop-types';

const IconRoundButton = ({ onClick, icon, className }) => (
  <button onClick={onClick} className={`btn btn-circle btn-md shadow-lg text-lg ${className}`}>
    {icon}
  </button>
);

IconRoundButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default IconRoundButton;
