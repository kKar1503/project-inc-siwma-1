import cx from 'classnames';
import PropTypes from 'prop-types';

const FileUpload = ({ className }) => (
  <div className={cx(className, 'flex flex-col bg-base-100 rounded-lg shadow-lg')}>
    <div className="p-6">
      <h2 className="text-lg font-bold">Bulk Add Companies & Invite Users</h2>
      <p>Import a .xlsx or .csv file below to bulk add company profiles and bulk invite users</p>
    </div>
    <hr />
    <div className="flex-1 p-6">
      <div className="flex flex-col justify-center items-center border border-primary-content border-dotted h-full p-10 gap-20">
        <div className="w-20 h-20 bg-base-300" />
        <p className="text-lg break-all">SIWMA_MEMBERS_FIRST_BATCH.xslx</p>
      </div>
    </div>
  </div>
);

FileUpload.propTypes = {
  className: PropTypes.string,
};

export default FileUpload;
