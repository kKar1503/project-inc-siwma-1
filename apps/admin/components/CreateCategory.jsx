import { useQuery, useQueries, useQueryClient } from 'react-query';
import supabase from '../supabaseClient';

const CreateCategory = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => supabase.from('category').select(`id, name, description`),
  });

  const addCategory = async (e) => {
    e.preventDefault();

    // const newCatName = {name: e.target.categoryDescription.value}

    // const catNames = []

    // do {
    //   catNames.push(data.name)
    // } while (catNames.length < data.length)

    // console.log(catNames)

    // let i = 0

    // while (catNames[i] !== newCatName.toString()) {
    //   i++
    //   alert('Duplicate category name detected!');
    //   if (catNames[i] !== newCatName.toString() && catNames.length < i) {
    //     alert('WOO YEAAA BABY!');
    //   }
    // }

    await supabase.from('category').insert({
      name: `${e.target.categoryName.value}`,
      description: `${e.target.categoryDescription.value}`,
    });

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
    </div>
  );
};

export default CreateCategory;
