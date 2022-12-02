import PropTypes from 'prop-types';
import BaseModal from './BaseModal';

/**
 * Company deletion modal
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns The company deletion confirmation modal
 */
const CompanyDelete = ({ isOpen, onRequestClose, company, onConfirm }) => (
  <BaseModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    header={
      <div>
        <h3 className="text-lg font-bold">Company deletion</h3>
        <p className="text-sm">Confirm deletion of selected company</p>
      </div>
    }
  >
    <div>
      <h3 className="text-lg font-medium">
        Are you sure you want to delete the company &quot;{company ? company.company : ''}&quot;?
      </h3>
      <p className="mt-2">This action cannot be undone!</p>
      <div className="mt-8 flex flex-1 justify-between">
        <button className="btn btn-success" onClick={onRequestClose}>
          Cancel
        </button>
        <button className="btn btn-error btn-outline" onClick={() => onConfirm(company)}>
          Confirm
        </button>
      </div>
    </div>
  </BaseModal>
);

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
  }),
  onConfirm: PropTypes.func.isRequired,
};

CompanyDelete.propTypes = propTypes;

export default CompanyDelete;
