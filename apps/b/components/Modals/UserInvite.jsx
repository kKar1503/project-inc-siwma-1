import BaseModal from './BaseModal';

const UserInvite = () => (
  <BaseModal
    id="user-invite"
    header={
      <div>
        <h3 className="text-lg font-bold">Create an individual invite</h3>
        <p className="text-sm">Invite an individual user to the system</p>
      </div>
    }
  >
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
      <button className="btn btn-outline btn-primary w-full">Send Invite</button>
    </div>
  </BaseModal>
);

export default UserInvite;
