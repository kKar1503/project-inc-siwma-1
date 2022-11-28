import PropTypes from 'prop-types';

const FlexContainer = ({ children, className }) => (
  <div className={`flex ${className}`}>{children}</div>
);

FlexContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FlexContainer;
