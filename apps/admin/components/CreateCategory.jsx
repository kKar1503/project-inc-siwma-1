import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Alert } from '@inc/ui';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const CreateCategory = () => {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [colourMessage, setColourMessage] = useState('text-center text-green-500 pt-1');
  const [colourMessage2, setColourMessage2] = useState('text-center text-green-500 pt-1');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');

  const checkFile = async (e, number) => {
    if (e.target.files[0] === undefined) {
      e.target.files = null;
    } else if (
      (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') &&
      number === 1
    ) {
      setImage(e.target.files[0]);
      setErrorMessage('Please click "Create"');
      setColourMessage('text-center text-green-500 pt-1');
    } else if (
      (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') &&
      number === 2
    ) {
      setImage2(e.target.files[0]);
      setErrorMessage2('Please click "Create"');
      setColourMessage2('text-center text-green-500 pt-1');
    } else {
      e.target.files = null;
      if (number === 1) {
        setErrorMessage('Only image file is allowed');
        setColourMessage('text-center text-red-500 pt-1');
        setTimeout(() => {
          setErrorMessage('');
          setColourMessage('text-center text-green-500 pt-1');
        }, 4000);
      } else {
        setErrorMessage2('Only image file is allowed');
        setColourMessage2('text-center text-red-500 pt-1');
        setTimeout(() => {
          setErrorMessage2('');
          setColourMessage2('text-center text-green-500 pt-1');
        }, 4000);
      }
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
      let newUUID = null;
      let newUUID2 = null;
      if (image !== null) {
        newUUID = crypto.randomUUID();
        await supabase.storage.from('category-image-bucket').upload(newUUID, image);
      }
      if (image2 !== null) {
        newUUID2 = crypto.randomUUID();
        await supabase.storage.from('category-cross-section-image-bucket').upload(newUUID2, image);
      }

      const { error: message } = await supabase
        .from('category')
        .update({ image: newUUID, cross_section_image: newUUID2 })
        .eq('id', data[0].id);
      setDisplayAlert(true);
      setErrorMessage('');
      setImage(null);
      setErrorMessage2('');
      setImage2(null);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 4000);
    }

    queryClient.invalidateQueries({ queryKey: ['categories'] });
    queryClient.invalidateQueries({ queryKey: ['getCategoryCount'] });
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
            // so regex being the funny it is has a minimum of at least 3 characters
            pattern="^[^\s].+[^\s]$"
            title="Category name should not have spaces as the first and last characters"
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
            // so regex being the funny it is has a minimum of at least 3 characters
            pattern="^[^\s].+[^\s]$"
            title="Category description should not have spaces as the first and last characters"
            required
          />
        </div>
        <div className="w-auto">
          <div className="label">
            <span className="label-text font-semibold">Category Image</span>
          </div>
          <label className="flex justify-center w-full h-40 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
              onChange={(e) => checkFile(e, 1)}
            />
          </label>
        </div>
        <div className="w-auto">
          <div className="label">
            <span className="label-text font-semibold">Cross Section Image</span>
          </div>
          <label className="flex justify-center w-full h-40 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="items-center space-x-2">
              {image2 !== null ? (
                <div>
                  <p className="text-xl text-gray-600 text-center my-6">Image Name:</p>
                  <p className="text-xl text-gray-600 text-center my-6">{image2.name}</p>
                </div>
              ) : (
                <div>
                  <FiUpload className="h-16 w-16 text-black m-auto my-4" />
                  <p className="text-xs text-gray-600 text-center my-6">
                    Click to upload or drag and drop PNG or JPG (MAX. 1200px x 900px)
                  </p>
                </div>
              )}
              {errorMessage2 !== '' && <p className={colourMessage2}>{errorMessage2}</p>}
            </span>
            <input
              type="file"
              name="file_upload_2"
              accept="image/*"
              className="hidden"
              onChange={(e) => checkFile(e, 2)}
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
