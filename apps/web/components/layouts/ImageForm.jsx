import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs'
import CardBackground from '../CardBackground';
import ErrorMessage from './ErrorMessage';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/webp'];

const ImageHook = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const validateImage = () => {
    if (selectedImages.length > 10) {
      setErrorMsg(`Max 10 images, you have selected ${selectedImages.length}`);
      return false;
    }
    if (selectedImages.length === 0) {
      setErrorMsg('Please select at least 1 image');
      return false;
    }
    setErrorMsg(null);
    return selectedImages;
  };

  const onSelectFile = (event) => {
    const images = Array.from(event.target.files).map((file) => ({
      name: file.name,
      link: URL.createObjectURL(file),
      blob: file,
    }));

    setSelectedImages((prevImages) => {
      // concat images to selectedImages
      const newImages = [...prevImages, ...images];
      return (
        newImages
          //  filter out duplication
          .filter((image, index) => newImages.findIndex((img) => img.name === image.name) === index)
          //  filter out unaccepted fileTypes
          .filter((image) => acceptedFileTypes.includes(image.blob.type))
      );
    });

    // chrome bug fix
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const imageDeleteHandler = (imageLink) => {
    setSelectedImages((prevImages) => prevImages.filter((img) => img.link !== imageLink));
  };

  return {
    imageHook: {
      selectedImages,
      onSelectFile,
      imageDeleteHandler,
      errorMsg,
    },
    validateImage,
  };
};

const ImageCard = ({ link, name, onClick }) => (
  <div className="flex flex-col justify-center relative border-2 border-secondary aspect-square rounded">
    <Image alt={name} src={link} fill className="object-cover" />
    <button className="relative ml-auto mr-2 mb-auto mt-2 bg-base-100 bg-opacity-50 p-1 rounded" onClick={() => onClick(link)}>
      <BsTrashFill className='w-6 h-6'/>
    </button>
  </div>
);

const ImageForm = ({ useImageHook }) => {
  const { selectedImages, onSelectFile, imageDeleteHandler, errorMsg } = useImageHook;

  return (
    <CardBackground>
      <ErrorMessage errorMsg={errorMsg} />
      <div className="alert bg-primary shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current text-white flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">Max 10 images</span>
          <span className="text-white">{selectedImages.length}/10</span>
        </div>
      </div>

      <label className="flex justify-center w-full h-40 px-4 transition bg-white border-2 border-accent border-dashed rounded-md appearance-none cursor-pointer hover:border-accent-focus focus:outline-none">
        <span className="flex items-center space-x-4">
          <div className="btn btn-ghost normal-case text-xl rounded-2xl bg-accent hover:bg-accent-focus">
            Upload Images
          </div>
          <span className="text-xs text-gray-600 text-center my-6">or drag it into this box</span>
        </span>
        <input
          type="file"
          className="hidden"
          onChange={onSelectFile}
          multiple
          accept={acceptedFileTypes.join(',')}
        />
      </label>
      {selectedImages && (
        <div className="inline-grid grid-cols-3 gap-4 w-full">
          {selectedImages.map((image) => (
            <ImageCard
              key={image.link}
              link={image.link}
              name={image.link.name}
              onClick={imageDeleteHandler}
            />
          ))}
        </div>
      )}
    </CardBackground>
  );
};

ImageForm.useHook = ImageHook;

ImageForm.propTypes = {
  useImageHook: PropTypes.shape({
    selectedImages: PropTypes.arrayOf(PropTypes.string),
    onSelectFile: PropTypes.func,
    imageDeleteHandler: PropTypes.func,
    errorMsg: PropTypes.string,
  }).isRequired,
};

ImageCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageForm;
