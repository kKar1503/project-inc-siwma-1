import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import { BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import BaseActionMenu from './BaseActionMenu';

/**
 * Creates a new action menu to be used for the companies table
 * @param {{ data: { id: number }, onDelete: (data, error) }} param0 The data accepted by the component
 * @returns A action menu
 */
const CompanyActionMenu = ({ data, onDelete }) => {
  // Initialise the supabase client
  const supabase = useSupabaseClient();

  const onDeleteHandler = async () => {
    // Attempt to delete any comments that the company might have
    await supabase.from('compaies_comments').delete().eq('companyid', data.id);

    // Attempt to delete the company
    const { error } = await supabase.from('companies').delete().eq('id', data.id);

    // Invoke the onDelete function passed in
    if (onDelete) onDelete(data, error);
  };

  return (
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
        <button onClick={onDeleteHandler} className="hover:btn-error">
          <BsTrash className="h-5 w-5" />
          Delete
        </button>
      </li>
    </BaseActionMenu>
  );
};

CompanyActionMenu.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    comments: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CompanyActionMenu;
