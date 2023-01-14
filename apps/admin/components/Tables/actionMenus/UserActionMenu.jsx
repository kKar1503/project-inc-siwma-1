import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import Link from 'next/link';
import PropTypes from 'prop-types';
import BaseActionMenu from './BaseActionMenu';

const UserActionMenu = ({ data }) => (
  <BaseActionMenu>
    <li>
      <button>
        <MdOutlineRemoveRedEye className="h-5 w-5" />
        View
      </button>
    </li>
    <li>
      <Link href={{ pathname: '/edit-user', query: { userid: data.id || '' } }}>
        <SlPencil className="h-5 w-5" />
        Edit
      </Link>
    </li>
  </BaseActionMenu>
);

UserActionMenu.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UserActionMenu;
