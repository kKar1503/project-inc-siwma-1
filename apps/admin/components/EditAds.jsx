import { useQueries, useQueryClient, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Alert } from '@inc/ui';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FiUpload } from 'react-icons/fi';
import crypto from 'crypto';
import Image from 'next/image';

const EditAds = ({ id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setlink] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imgSizeState, setImgSizeState] = useState(null);
  const [colourMessage, setColourMessage] = useState('text-center text-green-500 pt-4');
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = useSupabaseClient();

  const checkFile = async (e) => {
    if (e.target.files[0] === undefined) {
      e.target.files = null;
    } else if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      // check img width and height
      const img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        if (img.width === 1500 && img.height === 300) {
          // save image into setImage
          setImage(e.target.files[0]);
          // save uploaded img size
          setImgSizeState({ width: img.width, height: img.height });
          // correct image size message
          setErrorMessage('Please click "Create file"');
          setColourMessage('text-center text-green-500');
        } else {
          setImgSizeState({ width: img.width, height: img.height });
          setErrorMessage(
            'Please upload an image according to the size range mentioned.(1500px x 300px)'
          );
          setColourMessage('text-center text-orange-500 whitespace-pre-line');
        }
      };
    } else {
      // non image file is uploaded
      e.target.files = null;
      setErrorMessage('Only image file is allowed');
      setColourMessage('text-center text-red-500');
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

  // get advertisement details
  const { data } = useQuery({
    queryKey: ['editadvertisments', id],
    queryFn: async () =>
      supabase
        .from('advertisements')
        .select(`description, link, image, companies(name)`)
        .eq('id', `${id}`),
    enabled: !!id,
  });

  // set form values
  useEffect(() => {
    setName(data?.data[0]?.companies.name);
    setDescription(data?.data[0]?.description);
    setlink(data?.data[0]?.link);
    setImageURL(data?.data[0]?.image);
  }, [data]);

  // submit edit
  const editAdsvertisment = async (e) => {
    e.preventDefault();

    const { status } = await supabase
      .from('advertisements')
      .update({
        description: `${description}`,
        link: `${link}`,
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
        await supabase.storage.from('advertisement').upload(newUUID, image);
      }
      await supabase
        .from('advertisements')
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
        <h3 className="text-lg font-bold">Edit Advertisement</h3>
      </div>
      <form
        onSubmit={async (e) => {
          await editAdsvertisment(e);
        }}
      >
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Company Name</span>
          </div>
          <input
            name="Company Name"
            type="text"
            className="input-group input input-bordered"
            placeholder="Company Name"
            pattern="^[\w ]+$"
            title="Category name should only include letters"
            required
            value={name}
            disabled
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="label">
            <span className="label-text font-semibold">Current Advertisement Image</span>
          </div>
          <div>
            <Image
              src={`https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/advertisement-image-bucket/${imageURL}`}
              alt="Company advertisement"
              width={800}
              height={180}
              className="object-center"
            />
          </div>
        </div>
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Advertisement Description</span>
          </div>
          <input
            name="categoryDescription"
            type="text"
            className="input-group input input-bordered"
            placeholder="Advertisment Description"
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Company Link</span>
          </div>
          <input
            name="companylink"
            type="text"
            className="input-group input input-bordered"
            placeholder="Company Link"
            required
            value={link}
            onChange={(e) => {
              setlink(e.target.value);
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
                    Click to upload or drag and drop PNG or JPG (1500px x 300px)
                  </p>
                </div>
              )}
              <div className="pt-3">
                {errorMessage !== '' && <p className={colourMessage}>{errorMessage}</p>}
              </div>
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
            className="btn btn-outline btn-primary w-full"
            type="submit"
            disabled={
              // disable when no image has uploaded OR non image file is uploaded
              errorMessage === 'Only image file is allowed' ||
              // disable when image size is incorrect
              errorMessage ===
                'Please upload an image according to the size range mentioned.(1500px x 300px)'
            }
          >
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

EditAds.propTypes = {
  id: PropTypes.string,
};
export default EditAds;
