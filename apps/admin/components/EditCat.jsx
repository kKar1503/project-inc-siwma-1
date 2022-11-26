import { useQueries, useQueryClient, useQuery } from 'react-query';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';

const parseData = (data) => {
  console.log(data[0].name);
};

const EditCat = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['categoryData', id],
    queryFn: async () =>
      supabase
        .from('category')
        .select(`name, description`)
        .order('name', { ascending: true })
        .eq('id', `${id}`),
    enabled: !!id,
  });

  const editCategory = async (e) => {
    e.preventDefault();
    await supabase
      .from('category')
      .update({
        name: `${e.target.categoryName.value}`,
        description: `${e.target.categoryDescription.value}`,
      })
      .eq('id', id);
  };
  return (
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
              value={isLoading || id === undefined ? null : data?.data[0].name}
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
              value={isLoading || id === undefined ? null : data?.data[0].description}
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
};

EditCat.propTypes = {
  id: PropTypes.string,
};
export default EditCat;
