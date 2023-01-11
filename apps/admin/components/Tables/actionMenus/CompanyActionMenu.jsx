import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import { BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import PropTypes from 'prop-types';
import BaseActionMenu from './BaseActionMenu';

/**
 * Creates a new action menu to be used for the companies table
 * @param {{ data: { id: number }, onDelete: (data, error) }} param0 The data accepted by the component
 * @returns A action menu
 */
const CompanyActionMenu = ({ data, onDelete }) => (
  <BaseActionMenu>
    <li>
      <button>
        <MdOutlineRemoveRedEye className="h-5 w-5" />
        View
      </button>
    </li>
    <li>
      <Link href={{ pathname: '/edit-company', query: { companyid: data.id || 0 } }}>
        <SlPencil className="h-5 w-5" />
        Edit
      </Link>
    </li>
    <li>
      <button onClick={() => onDelete(data)} className="hover:btn-error">
        <BsTrash className="h-5 w-5" />
        Delete
      </button>
    </li>
  </BaseActionMenu>
);

CompanyActionMenu.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    comments: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CompanyActionMenu;