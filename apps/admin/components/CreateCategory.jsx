import { useQueries, useQueryClient } from 'react-query';
import supabase from '../supabaseClient';

const CreateCategory = () => {
  const queryClient = useQueryClient();

  const reinstateCompanies = async (e) => {
    e.preventDefault();
    await supabase.from('category').insert({
      name: `${e.target.categoryName.value}`,
      description: `${e.target.categoryDescription.value}`,
    });

    // Invalidate old query to cause a refetch
    queryClient.invalidateQueries({ queryKey: ['categories'] });

    // Update the visible property of every company in the selectedCompanies array
    // setselectedCompanies(selectedCompanies.map((e) => ({ ...e, visible: true })));
  };

  return (
    <div>
      <div>
        <h3 className="text-lg font-bold">Create a category</h3>
        <p className="text-sm">Add a new category into the system</p>
      </div>
      <form
        onSubmit={async (e) => {
          await reinstateCompanies(e);
          console.log(e.target.categoryName.value);
          console.log(e.target.categoryDescription.value);
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
    </div>
  );
};

export default CreateCategory;
