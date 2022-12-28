/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { BiSearch } from 'react-icons/bi';

const ChatFilter = () => (
  <div className="flex items-center">
    <div className="dropdown mx-2">
      <label tabIndex={0} className="btn m-1">
        CHAT FILTER
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a href="localhost">All Chats</a>
        </li>
        <li>
          <a href="localhost">Selling</a>
        </li>
        <li>
          <a href="localhost">Buying</a>
        </li>
        <li>
          <a href="localhost">Archives</a>
        </li>
      </ul>
    </div>
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Chat History"
          className="input input-bordered"
          style={{
            borderTopLeftRadius: 'var(--rounded-btn, 0.5rem) !important;',
            borderBottomLeftRadius: 'var(--rounded-btn, 0.5rem) !important;',
          }}
        />
        <button
          className="btn btn-square"
          style={{
            borderTopRightRadius: 'var(--rounded-btn, 0.5rem) !important;',
            borderBottomRightRadius: 'var(--rounded-btn, 0.5rem) !important;',
          }}
        >
          <BiSearch className="text-2xl" />
        </button>
      </div>
    </div>
  </div>
);

export default ChatFilter;
