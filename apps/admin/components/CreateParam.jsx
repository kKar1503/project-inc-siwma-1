const CreateParam = () => (
  <div>
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
          <span className="label-text font-semibold">Data Type</span>
        </div>
        <select className="select select-bordered font-normal text-gray-400">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text font-semibold">
            Choice options (Seperate with a `&apos`,`&apos`)
          </span>
        </div>
        <input
          type="text"
          className="input-group input input-bordered"
          placeholder="Choice Options"
        />
      </div>
    </form>
    <div className="modal-action">
      <label htmlFor="user-invite" className="btn btn-outline btn-primary w-full">
        Save
      </label>
    </div>
  </div>
);

export default CreateParam;
