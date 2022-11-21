const CreateCategory = () => (
  <div>
    <div>
      <h3 className="text-lg font-bold">Create a category</h3>
      <p className="text-sm">Add a new category into the system</p>
    </div>
    <form>
      <div className="form-control">
        <div className="label">
          <span className="label-text font-semibold">Cateogry Name</span>
        </div>
        <input
          type="text"
          className="input-group input input-bordered"
          placeholder="Category Name"
        />
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text font-semibold">Category Description</span>
        </div>
        <input
          type="text"
          className="input-group input input-bordered"
          placeholder="Category Description"
        />
      </div>
    </form>
    <div className="modal-action">
      <label htmlFor="user-invite" className="btn btn-outline btn-primary w-full">
        Create
      </label>
    </div>
  </div>
);

export default CreateCategory;
