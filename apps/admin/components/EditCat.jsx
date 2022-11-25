// import { useQueries, useQueryClient } from 'react-query';
// import PropTypes from 'prop-types';
import supabase from '../supabaseClient';

const EditCat = ({ data, row }) => {
  const editCategory = async (e) => {
    e.preventDefault();
    // console.log(data);
    await supabase
      .from('category')
      .update({
        name: `${e.target.categoryName.value}`,
        description: `${e.target.categoryDescription.value}`,
      })
      .eq('id', data[row].id);
  };

  <div>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className="card rounded-xl">
      <div>
        <h3 className="text-lg font-bold">Edit Category</h3>
        <p className="text-sm">Edit Category information</p>
      </div>
      <form
        onSubmit={async (e) => {
          await editCategory(e);
          // console.log(e.target.categoryName.value);
          // console.log(e.target.categoryDescription.value);
        }}
      >
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Cateogry Name</span>
          </div>
          <input
            name="categoryName"
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
            name="categoryDescription"
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
  </div>;
};

export default EditCat;
