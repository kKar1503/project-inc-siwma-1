import cx from 'classnames';
import PropTypes from 'prop-types';

const FlexContainer = ({ children, className }) => (
  <div
    className={cx('flex flex-wrap', {
      [className]: className,
    })}
  >
    {children}
  </div>
);

FlexContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FlexContainer;
