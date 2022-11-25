import { BsThreeDotsVertical, BsFillPencilFill } from 'react-icons/bs';
import { RiInboxArchiveFill, RiInboxUnarchiveFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

const ActionCat = ({ data, row }) => (
  <div className="dropdown dropdown-left">
    <button className="btn btn-ghost">
      <BsThreeDotsVertical />
    </button>
    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
      <li>
        <div className="btn btn-ghost w-30">
          <BsFillPencilFill />
          Edit
        </div>
      </li>
      <li>
        <div className="btn btn-ghost w-30" disabled={data[row].active === 'Active'}>
          <RiInboxArchiveFill />
          Archive
        </div>
      </li>
      <li>
        <div className="btn btn-ghost w-30" disabled={data[row].active === 'Disabled'}>
          <RiInboxUnarchiveFill />
          UnArchive
        </div>
      </li>
    </ul>
  </div>
);

const propTypes = {
  row: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
};

ActionCat.propTypes = propTypes;
export default ActionCat;
