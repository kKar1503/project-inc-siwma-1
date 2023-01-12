import PropTypes from 'prop-types';

const BaseActionMenu = ({ children }) => (
  <ul className="menu bg-base-100 w-56 p-2 rounded-lg shadow-lg">{children}</ul>
);

const propTypes = {
  children: PropTypes.node.isRequired,
};

BaseActionMenu.propTypes = propTypes;

export default BaseActionMenu;