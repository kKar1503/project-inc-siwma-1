// import {IoCloseSharp} from 'react-icons/io5';

const UserInvite = () => (
  <div>
    <input type="checkbox" id="user-invite" className="modal-toggle" />
    <label htmlFor="user-invite" className="modal cursor-pointer">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="" className="modal-box rounded-xl">
        <label
          htmlFor="user-invite"
          className="text-lg absolute right-4 top-2 hover:cursor-pointer"
        >
          {/* <IoCloseSharp/> */}
        </label>
        <div>
          <h3 className="text-lg font-bold">Create an individual invite</h3>
          <p className="text-sm">Invite an individual user to the system</p>
        </div>
        <form>
          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold">E-mail</span>
            </div>
            <input
              type="text"
              className="input-group input input-bordered"
              placeholder="User's e-mail"
            />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Company</span>
            </div>
            <select className="select select-bordered font-normal text-gray-400">
              <option>User&apos;s company</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Mobile number(optional)</span>
            </div>
            <input
              type="text"
              className="input-group input input-bordered"
              placeholder="User's mobile no."
            />
          </div>
        </form>
        <div className="modal-action">
          <label htmlFor="user-invite" className="btn btn-outline btn-primary w-full">
            Send Invite
          </label>
        </div>
      </label>
    </label>
  </div>
);

export default UserInvite;
