import { BsThreeDotsVertical, BsFillPencilFill } from 'react-icons/bs';
import { FaBox } from 'react-icons/fa';

const ActionCat = () => (
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
        <div className="btn btn-ghost w-30">
          <FaBox />
          Archive
        </div>
      </li>
    </ul>
  </div>
);

export default ActionCat;
