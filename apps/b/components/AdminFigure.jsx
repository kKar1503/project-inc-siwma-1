import PropTypes from 'prop-types';
import cx from 'classnames';

const AdminFigure = ({ title, value, icon, color }) => (
  <div className="flex flex-row w-full h-40 shadow-xl items-center p-6 rounded-2xl space-between justify-between">
    <div className="flex flex-col mt-4 border h-full justify-center">
      <p className={cx('text-5xl font-black py-1', color ?? 'text-gray-700')}>{value}</p>
      <h2 className="text-xl font-semibold text-gray-700 py-1">{title}</h2>
    </div>
    <div className="flex items-center justify-center w-24 h-24 bg-blue-500">{icon}</div>
  </div>
);

// color parameter must be a tailwindcss text color class

AdminFigure.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.element,
  color: PropTypes.string,
};

export default AdminFigure;
