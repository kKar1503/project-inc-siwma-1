/* eslint-disable no-console */
import PropType from 'prop-types';
import { FiUpload } from 'react-icons/fi';
import { useState } from 'react';
import supabase from '../client';

const UploadCard = ({ id }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [message, setMessage] = useState('');
  // note: if file is successfully uploaded -> "Create" button is abled

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(image);
    // let uploadedURL = '';

    if (image) {
      const { data, error } = await supabase.storage
        .from('advertisement')
        .upload(`${Date.now()}_${image.name}`, image);

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
      img_file_name: image.name,
      ad_space_id: 1,
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      setMessage('Image have been updated');
    }
  };

  return (
    <div className="max-w-xl">
      <label className="flex justify-center w-full h-40 px-4 mt-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
        <span className="items-center space-x-2">
          <FiUpload className="h-16 w-16 text-black m-auto my-4" />
          <p className="text-xs text-gray-600 text-center my-6">
            Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)
          </p>
        </span>
        <input
          type="file"
          name="file_upload"
          accept="image/jpeg image/png"
          className="hidden"
          disabled={id === ''}
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className="flex items-center justify-center">
        <button
          className="btn btn-ghost rounded-md w-full h-6 my-8 normal-case text-base btn btn-outline btn-primary"
          disabled={image === null}
          onClick={handleUpload}
        >
          Create
        </button>
      </div>
    </div>
  );
};

UploadCard.propTypes = {
  id: PropType.string.isRequired,
};
export default UploadCard;
