import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import { BsTrash } from 'react-icons/bs';
import TableMenu from './TableMenu';
/* selectedColor is the color of the button when it is selected.
When it is not selected, it is black.
*/

const ActionMenu = ({ queryLink }) => {
  <TableMenu>
    <li>
      <button>
        <MdOutlineRemoveRedEye className="h-5 w-5" />
        View
      </button>
    </li>
    <li>
      <Link href={queryLink}>
        <SlPencil className="h-5 w-5" />
        Edit
      </Link>
    </li>
    <li>
      <button>
        <BsTrash className="h-5 w-5" />
        Delete
      </button>
    </li>
  </TableMenu>;
};

ActionMenu.propTypes = {
  queryLink: PropTypes.number,
};

export default ActionMenu;
