/* eslint-disable no-console */
import PropType from 'prop-types';
import { FiUpload } from 'react-icons/fi';
import { useState } from 'react';
import supabase from '../client';

const UploadCard = ({ id, des }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // note: if file is successfully uploaded -> "Create" button is abled

  const checkFile = async (img) => {
    if (img.type === 'image/png' || img.type === 'image/jpeg') {
      setImage(img);
    } else {
      console.log(img.type);
      console.log('not image');
      setErrorMessage('Only image file is allowed');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(image);

    if (image) {
      console.log(image.type);
      const { data, error } = await supabase.storage
        .from('advertisement')
        .upload(`${image.name}`, image);

      if (error) {
        console.log(error);
      }

      if (data) {
        setImageURL(data);
        // uploadedURL = data
      }
    }

    const { data, error } = await supabase.from('Advertisement').upsert({
      company_id: id,
      image: image.name,
      description: des,
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  };

  return (
    <div className="max-w-xl">
      <label className="flex justify-center w-full h-40 px-4 mt-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
        <span className="items-center space-x-2">
          <FiUpload className="h-16 w-16 text-black m-auto my-4" />
          <p className="text-xs text-gray-600 text-center my-6">
            Click to upload or drag and drop PNG or JPG (MAX. 1200px x 900px)
          </p>
          {errorMessage !== '' && <p>{errorMessage}</p>}
        </span>
        <input
          type="file"
          name="file_upload"
          accept="image/*"
          className="hidden"
          disabled={id === '' || des === ''}
          onChange={(e) => checkFile(e.target.files[0])}
        />
      </label>
      <div className="flex items-center justify-center">
        <button
          className="btn btn-ghost rounded-md w-full h-6 my-8 normal-case text-base btn btn-outline btn-primary"
          disabled={errorMessage !== ''}
          onClick={handleUpload}
        >
          Create
        </button>
      </div>
    </div>
  );
};

UploadCard.propTypes = {
  id: PropType.number.isRequired,
  des: PropType.string.isRequired,
};
export default UploadCard;