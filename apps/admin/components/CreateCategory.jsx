import { useQuery, useQueries, useQueryClient } from 'react-query';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Alert } from '@inc/ui';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import crypto from 'crypto';

const CreateCategory = () => {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [colourMessage, setColourMessage] = useState('text-center text-green-500 pt-4');
  const [errorMessage, setErrorMessage] = useState('');

  const checkFile = async (e) => {
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      setImage(e.target.files[0]);
      setErrorMessage('Please click "Create file"');
      setColourMessage('text-center text-green-500 pt-4');
    } else {
      e.target.files = null;
      setErrorMessage('Only image file is allowed');
      setColourMessage('text-center text-red-500 pt-4');
      setTimeout(() => {
        setErrorMessage('');
        setColourMessage('text-center text-green-500 pt-4');
      }, 4000);
    }
  };
  // const { data, isLoading } = useQuery({
  //   queryKey: ['newCategory'],
  //   queryFn: async () => supabase.from('category').select(`id, name`),
  // });

  // const { data, isLoading } = useQuery({
  //   queryKey: ['newCategory'],
  //   queryFn: async () => supabase.from('category').select(`id, name`),
  // });

  const changeUUID = (uuid) => {
    const parts = [];
    parts.push(uuid.slice(0, 8));
    parts.push(uuid.slice(8, 12));
    parts.push(uuid.slice(12, 16));
    parts.push(uuid.slice(16, 20));
    parts.push(uuid.slice(20, 32));
    return parts.join('-');
  };

  const addCategory = async (e) => {
    e.preventDefault();

    const { data, status } = await supabase
      .from('category')
      .insert({
        name: `${e.target.categoryName.value}`,
        description: `${e.target.categoryDescription.value}`,
      })
      .select('id');

    if (status === 409) {
      setDisplayAlert(true);
      setError(true);
      setTimeout(() => {
        setDisplayAlert(false);
        setError(false);
      }, 4000);
    } else {
      const randomUUID = crypto.randomBytes(32).toString('hex');
      const newUUID = changeUUID(randomUUID);

      await supabase.storage.from('category-image-bucket').upload(newUUID, image);
      const { error: message } = await supabase
        .from('category')
        .update({ image: newUUID })
        .eq('id', data[0].id);
      setDisplayAlert(true);
      setErrorMessage('');
      setImage(null);
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
            pattern="^[A-Za-z]+$"
            title="Category name should only include letters"
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
        <div className="w-auto">
          <label className="flex justify-center w-full h-40 px-4 mt-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="items-center space-x-2">
              {image !== null ? (
                <div>
                  <p className="text-xl text-gray-600 text-center my-6">Image Name:</p>
                  <p className="text-xl text-gray-600 text-center my-6">{image.name}</p>
                </div>
              ) : (
                <div>
                  <FiUpload className="h-16 w-16 text-black m-auto my-4" />
                  <p className="text-xs text-gray-600 text-center my-6">
                    Click to upload or drag and drop PNG or JPG (MAX. 1200px x 900px)
                  </p>
                </div>
              )}
              {errorMessage !== '' && <p className={colourMessage}>{errorMessage}</p>}
            </span>
            <input
              type="file"
              name="file_upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => checkFile(e)}
            />
          </label>
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
