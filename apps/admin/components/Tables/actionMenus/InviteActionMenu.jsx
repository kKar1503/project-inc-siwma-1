import { BiMailSend } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseActionMenu from './BaseActionMenu';

const InviteActionMenu = ({ data, onRevoke, onResend }) => (
  <BaseActionMenu>
    <li>
      <button onClick={() => onResend(data.id)} className="hover:btn-info">
        <BiMailSend className="h-5 w-5" />
        Resend
      </button>
    </li>
    <li>
      <button onClick={() => onRevoke(data.id)} className="hover:btn-error">
        <BsTrash className="h-5 w-5" />
        Revoke
      </button>
    </li>
  </BaseActionMenu>
);

InviteActionMenu.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.number,
    expiry: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  onRevoke: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};

export default InviteActionMenu;
