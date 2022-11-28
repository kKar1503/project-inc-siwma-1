import { useQuery, useQueries, useQueryClient } from 'react-query';
import { useState } from 'react';
import { Alert } from '@inc/ui';
import supabase from '../supabaseClient';

const CreateCategory = () => {
  const queryClient = useQueryClient();
  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(null);

  // const { data, isLoading } = useQuery({
  //   queryKey: ['newCategory'],
  //   queryFn: async () => supabase.from('category').select(`id, name`),
  // });

  // const { data, isLoading } = useQuery({
  //   queryKey: ['newCategory'],
  //   queryFn: async () => supabase.from('category').select(`id, name`),
  // });

  const addCategory = async (e) => {
    e.preventDefault();

    // const newCatName = { name: e.target.categoryName.value };

    // console.log(data.data);
    // const currentCatNames = [];

    // for (let i = 0; i < data.data.length; i++) {
    //   currentCatNames.push(data.data[i].name);
    // } if (currentCatNames.includes(e.target.categoryName.value)) {
    //   <Alert level="error" message="Duplicate category name found" className="mt-14" />;
    // } else {
    //   await supabase.from('category').insert({
    //     name: `${e.target.categoryName.value}`,
    //     description: `${e.target.categoryDescription.value}`,
    //   });
    //   <Alert level="success" message="Category successfully edited" className="mt-14" />;
    // }

    // console.log(currentCatNames);

    const { data, status } = await supabase.from('category').insert({
      name: `${e.target.categoryName.value}`,
      description: `${e.target.categoryDescription.value}`,
    });

    if (status === 409) {
      setDisplayAlert(true);
      setError(true);
      setTimeout(() => {
        setDisplayAlert(false);
        setError(false);
      }, 4000);
    } else {
      setDisplayAlert(true);

      setTimeout(() => {
        setDisplayAlert(false);
      }, 4000);
    }

    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  return (
    <div>
      <div>
        <h3 className="text-lg font-bold">Create a category</h3>
      </div>
      <form
        onSubmit={async (e) => {
          await addCategory(e);
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
            required
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
            required
          />
        </div>
        <div className="modal-action">
          <button
            htmlFor="user-invite"
            className="btn btn-outline btn-primary w-full"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
      {displayAlert && error && (
        <Alert level="error" message="Duplicate category name found" className="mt-4" />
      )}
      {displayAlert && error === false && (
        <Alert level="success" message="Category successfully created" className="mt-4" />
      )}
    </div>
  );
};

export default CreateCategory;
