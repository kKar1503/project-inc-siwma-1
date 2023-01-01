import { useQuery, useQueries, useQueryClient } from 'react-query';
import PropType from 'prop-types';
import { FiUpload } from 'react-icons/fi';
import { useState } from 'react';
import { Alert } from '@inc/ui';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import crypto from 'crypto';

const UploadCard = ({ id, des, link, state }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState(null);
  const [colourMessage, setColourMessage] = useState('text-center text-green-500 pt-4');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayAlert, setDisplayAlert] = useState(null);
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const checkFile = async (e) => {
    if (e.target.files[0] === undefined) {
      e.target.files = null;
    } else if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      setImage(e.target.files[0]);
      setErrorMessage('Please click "Create file"');
      setColourMessage('text-center text-green-500 pt-4');
    } else {
      e.target.files = null;
      setErrorMessage('Only image file is allowed');
      setColourMessage('text-center text-red-500 pt-4');
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

  const addAdvertisement = async (e) => {
    e.preventDefault();

    const { data, status } = await supabase
      .from('advertisements')
      .insert({
        company_id: id,
        description: des,
        link,
      })
      .select('id');

    if (status === 409) {
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 4000);
    } else {
      const randomUUID = crypto.randomBytes(32).toString('hex');
      const newUUID = changeUUID(randomUUID);

      await supabase.storage.from('advertisement').upload(newUUID, image);
      const { error: message } = await supabase
        .from('advertisements')
        .update({ image: newUUID })
        .eq('id', data[0].id);
      setDisplayAlert(true);
      setError('');
      setImage(null);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 4000);
    }

    queryClient.invalidateQueries({ queryKey: ['ads'] });
  };

  return (
    <div>
      <div className="card max-sm:w-full h-80 bg-base-100 shadow-xl px-8 py-8 ">
        <div className="max-w-xl">
          <form
            onSubmit={async (e) => {
              await addAdvertisement(e);
            }}
          >
            <label className="flex justify-center w-full h-40 px-4 mt-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="items-center space-x-2">
                {image !== null ? (
                  <div>
                    <p className="text-xl text-gray-600 text-center my-6 px-20">Image Name:</p>
                    <p className="text-xl text-cyan-600 text-center my-6">{image.name}</p>
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
                id="file_upload"
                type="file"
                name="file_upload"
                accept="image/*"
                className="hidden"
                disabled={!state}
                onChange={(e) => checkFile(e)}
              />
            </label>
            <div className="flex items-center justify-center">
              <button
                className="btn btn-ghost rounded-md w-full h-6 my-8 normal-case text-base btn btn-outline btn-primary"
                disabled={errorMessage === '' || errorMessage === 'Only image file is allowed'}
                type="submit"
                id="submitpic"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {displayAlert && error && (
        <Alert level="error" message="Duplicate Advertisement found" className="mt-4" />
      )}
      {displayAlert && error === '' && (
        <Alert level="success" message="Advertisement successfully added" className="mt-4" />
      )}
    </div>
  );
};

UploadCard.propTypes = {
  state: PropType.bool.isRequired,
  id: PropType.number.isRequired,
  des: PropType.string.isRequired,
  link: PropType.string.isRequired,
};
export default UploadCard;
