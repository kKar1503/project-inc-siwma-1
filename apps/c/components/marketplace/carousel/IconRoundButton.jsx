import PropTypes from 'prop-types';

const IconRoundButton = ({ onClick, icon }) => (
  <button onClick={onClick} className="btn btn-circle btn-md shadow-lg text-lg">
    {icon}
  </button>
);

IconRoundButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
};

export default IconRoundButton;
