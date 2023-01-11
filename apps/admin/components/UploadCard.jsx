import { useQueryClient, useMutation } from 'react-query';
import PropType from 'prop-types';
import { FiUpload } from 'react-icons/fi';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { v4 as uuidv4 } from 'uuid';

const UploadCard = ({ id, des, link, state, setAlert }) => {
  const [image, setImage] = useState(null);
  const [colourMessage, setColourMessage] = useState('text-center text-green-500');
  const [errorMessage, setErrorMessage] = useState('');
  const [imgSizeState, setImgSizeState] = useState(null);
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

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
      setColourMessage('text-center text-red-500 pt-4');
    }
  };

  // insert image into supabase
  const addAdvertisement = async ({ e }) => {
    e.preventDefault();

    // insert advertisement details
    const { data, status } = await supabase
      .from('advertisements')
      .insert({
        company_id: id,
        description: des,
        link,
      })
      .select('id');

    if (status === 409) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 4000);
    } else {
      // create uuid
      const newUUID = uuidv4();
      // upload image to storage
      await supabase.storage.from('advertisement-image-bucket').upload(newUUID, image);

      // update advertisement table
      const { error: message } = await supabase
        .from('advertisements')
        .update({ image: newUUID })
        .eq('id', data[0].id);
      setAlert(true);
      setImage(null);
      setTimeout(() => {
        setAlert(false);
      }, 4000);
    }
  };

  // set useMutation conditions
  const refresh = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
    onError: (error) => {
      console.log(error);
    },
  };

  // insert advertisement details mutation
  const { mutate } = useMutation(addAdvertisement, refresh);

  return (
    <div className="card w-1/3  max-sm:w-full h-80 bg-base-100 shadow-xl max-sm:mb-10">
      <div className="w-full ">
        <div className="justify-center m-4 ">
          <form
            onSubmit={async (e) => {
              mutate({ e : e });
            }}
          >
            <label className="flex justify-center w-full h-40 px-4 mt-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="items-center">
                {imgSizeState !== null ? (
                  <div>
                    <p className="text-xl text-gray-600 text-center my-4 ">Image Size:</p>
                    <p className="text-xl text-cyan-600 text-center my-4">
                      Width : {imgSizeState.width}px
                    </p>
                    <p className="text-xl text-cyan-600 text-center my-4">
                      Height : {imgSizeState.height}px
                    </p>
                  </div>
                ) : (
                  <div>
                    <FiUpload className="h-16 w-16 text-black m-auto my-4" />
                    <p className="text-xs text-gray-600 text-center my-6">
                      Click to upload or drag and drop PNG or JPG (1500px x 300px)
                    </p>
                  </div>
                )}
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
            <div className="mt-4">
              {errorMessage !== '' && <p className={colourMessage}>{errorMessage}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="btn btn-ghost rounded-md w-full h-6 my-4 normal-case text-xl btn btn-outline btn-primary"
                disabled={
                  // disable when no image has uploaded OR non image file is uploaded
                  errorMessage === '' ||
                  errorMessage === 'Only image file is allowed' ||
                  // disable when image size is incorrect
                  imgSizeState === null ||
                  errorMessage ===
                    'Please upload an image according to the size range mentioned.(1500px x 300px)'
                }
                type="submit"
                id="submitpic"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UploadCard.propTypes = {
  state: PropType.bool.isRequired,
  id: PropType.number.isRequired,
  des: PropType.string.isRequired,
  link: PropType.string.isRequired,
  setAlert: PropType.func.isRequired,
};
export default UploadCard;
