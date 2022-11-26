import { useQueries, useQueryClient, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';

const EditCat = ({ id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data } = useQuery({
    queryKey: ['categoryData', id],
    queryFn: async () =>
      supabase
        .from('category')
        .select(`name, description`)
        .order('name', { ascending: true })
        .eq('id', `${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    setName(data?.data[0].name);
    setDescription(data?.data[0].description);
  }, [data]);

  const editCategory = async (e) => {
    e.preventDefault();
    await supabase
      .from('category')
      .update({
        name: `${name}`,
        description: `${description}`,
      })
      .eq('id', `${id}`);
  };
  return (
    <div>
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="modal-action">
          <button
            htmlFor="user-invite"
            className="btn btn-outline btn-primary w-full"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

EditCat.propTypes = {
  id: PropTypes.string,
};
export default EditCat;
