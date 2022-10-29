import PropTypes from 'prop-types';
import HamburgerMenu from './hamburgermenu';

HamburgerMenu.propTypes = {
  navigationTabs: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
};
