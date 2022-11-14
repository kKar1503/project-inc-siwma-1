import PropTypes from 'prop-types';
import cx from 'classnames';

const AdminFigure = ({ title, value, icon, color, className }) => (
  <div
    className={cx(
      'flex flex-row grow h-40 shadow-xl items-center p-6 rounded-2xl space-between justify-between bg-base-100',
      className
    )}
  >
    <div className="flex flex-col mt-4 h-full items-left">
      <p className={cx('text-6xl font-black py-1 pr-4 select-none', color ?? 'text-gray-700')}>
        {value}
      </p>
      <h2 className="text-lg text-left text-gray-700 py-1 select-none">{title}</h2>
    </div>
    <div className="flex items-center justify-center w-28 h-28 pl-4">{icon}</div>
  </div>
);

// color parameter must be a tailwindcss text color class
// icon color should be set in the icon itself

AdminFigure.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.element,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default AdminFigure;
