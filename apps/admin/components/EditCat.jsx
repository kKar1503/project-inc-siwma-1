const EditCat = () => (
  <div>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="" className="card rounded-xl">
      <div>
        <h3 className="text-lg font-bold">Edit Category</h3>
        <p className="text-sm">Edit Category information</p>
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
          Save
        </label>
      </div>
    </label>
  </div>
);

export default EditCat;
