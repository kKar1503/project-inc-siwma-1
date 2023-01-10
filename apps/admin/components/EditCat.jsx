import { useQueries, useQueryClient, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Alert } from '@inc/ui';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FiUpload } from 'react-icons/fi';
import crypto from 'crypto';

const EditCat = ({ id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [colourMessage, setColourMessage] = useState('text-center text-green-500 pt-4');
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = useSupabaseClient();

  const checkFile = async (e) => {
    if (e.target.files[0] === undefined) {
      e.target.files = null;
    } else if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      setImage(e.target.files[0]);
      setErrorMessage('Please click "Create"');
      setColourMessage('text-center text-green-500 pt-1');
    } else {
      e.target.files = null;
      setErrorMessage('Only image file is allowed');
      setColourMessage('text-center text-red-500 pt-1');
      setTimeout(() => {
        setErrorMessage('');
        setColourMessage('text-center text-green-500 pt-1');
      }, 4000);
    }
  };

  const changeUUID = (uuid) => {
    const parts = [];
    parts.push(uuid.slice(0, 8));
    parts.push(uuid.slice(8, 12));
    parts.push(uuid.slice(12, 16));
    parts.push(uuid.slice(16, 20));
    parts.push(uuid.slice(20, 32));
    return parts.join('-');
  };

  const { data } = useQuery({
    queryKey: ['categoryData', id],
    queryFn: async () =>
      supabase
        .from('category')
        .select(`name, description, image`)
        .order('name', { ascending: true })
        .eq('id', `${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    setName(data?.data[0].name);
    setDescription(data?.data[0].description);
    console.log(image);
  }, [data]);

  const editCategory = async (e) => {
    e.preventDefault();

    const { status } = await supabase
      .from('category')
      .update({
        name: `${name}`,
        description: `${description}`,
      })
      .eq('id', `${id}`);

    if (status === 409) {
      setDisplayAlert(true);
      setError(true);
      setTimeout(() => {
        setDisplayAlert(false);
        setError(false);
      }, 4000);
    } else {
      let newUUID = data?.data[0].image;
      if (image !== null) {
        const randomUUID = crypto.randomBytes(32).toString('hex');
        newUUID = changeUUID(randomUUID);
        await supabase.storage.from('category-image-bucket').upload(newUUID, image);
      }
      await supabase
        .from('category')
        .update({
          image: `${newUUID}`,
        })
        .eq('id', `${id}`);
      setDisplayAlert(true);
      setErrorMessage('');
      setImage(null);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 4000);
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-lg font-bold">Edit Category</h3>
      </div>
      <form
        onSubmit={async (e) => {
          await editCategory(e);
        }}
      >
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Category Name</span>
          </div>
          <input
            name="categoryName"
            type="text"
            className="input-group input input-bordered"
            placeholder="Category Name"
            pattern="^[^\s].+[^\s]$"
            title="Category name should not have spaces at the start or end"
            required
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
            pattern="^[^\s].+[^\s]$"
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
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
          <div className="flex px-8 pb-8">
            <Link href="/category_management" className="btn btn-outline btn-warning">
                Return To Category
            </Link>
          </div>
          <button className="btn btn-outline btn-primary" type="submit">
            Save
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

EditCat.propTypes = {
  id: PropTypes.string,
};
export default EditCat;
