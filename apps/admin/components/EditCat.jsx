import { useQueryClient, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Alert } from '@inc/ui';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FiUpload } from 'react-icons/fi';

const EditCat = ({ id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [image2, setImage2] = useState(null);
  const [imageURL2, setImageURL2] = useState('');
  const [colourMessage, setColourMessage] = useState('text-center text-green-500 pt-4');
  const [errorMessage, setErrorMessage] = useState('');
  const [colourMessage2, setColourMessage2] = useState('text-center text-green-500 pt-4');
  const [errorMessage2, setErrorMessage2] = useState('');
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

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

  const { data } = useQuery({
    queryKey: ['categoryData', id],
    queryFn: async () =>
      supabase
        .from('category')
        .select(`name, description, image, cross_section_image`)
        .order('name', { ascending: true })
        .eq('id', `${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    setName(data?.data[0].name);
    setDescription(data?.data[0].description);
    setImageURL(data?.data[0].image);
    setImageURL2(data?.data[0].cross_section_image);
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
      let newUUID2 = data?.data[0].cross_section_image;
      if (image !== null) {
        newUUID = crypto.randomUUID();
        await supabase.storage.from('category-image-bucket').upload(newUUID, image);
      }
      if (image2 !== null) {
        newUUID2 = crypto.randomUUID();
        await supabase.storage.from('category-cross-section-image-bucket').upload(newUUID2, image2);
      }
      await supabase
        .from('category')
        .update({
          image: newUUID,
          cross_section_image: newUUID2,
        })
        .eq('id', `${id}`);
      setDisplayAlert(true);
      setErrorMessage('');
      setErrorMessage2('');
      setImage(null);
      setImage2(null);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 4000);
    }
    queryClient.invalidateQueries({ queryKey: ['categoryData'] });
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
        <div>
          <div className="label">
            <span className="label-text font-semibold">Current Category Image</span>
          </div>
          <div>
            <Image
              src={`https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/category-image-bucket/${imageURL}`}
              alt="Category Image"
              width={200}
              height={180}
              className="object-center"
            />
          </div>
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
              onChange={(e) => checkFile(e, 1)}
            />
          </label>
        </div>
        <div>
          <div className="label">
            <span className="label-text font-semibold">Current Cross Section Image</span>
          </div>
          <div>
            <Image
              src={`https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/category-cross-section-image-bucket/${imageURL2}`}
              alt="Cross Section Image"
              width={200}
              height={180}
              className="object-center"
            />
          </div>
        </div>
        <div className="w-auto">
          <label className="flex justify-center w-full h-40 px-4 mt-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
        <Alert
          level="success"
          message="Category successfully edited, please click back to return to category page"
          className="mt-4"
        />
      )}
    </div>
  );
};

EditCat.propTypes = {
  id: PropTypes.string,
};
export default EditCat;
