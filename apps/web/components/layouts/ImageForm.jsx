import Image from 'next/image';
import PropTypes from 'prop-types';
import {array, number, object, string} from 'yup';
import {useState} from 'react';
import CardBackground from '../CardBackground';
import ErrorMessage from './ErrorMessage';

const imageValidationSchema = object({
  imageLength: number().required().min(1).max(10),
  images: array().of(object({
    link: string().required(),
    blob: object().required(),
  }))
})

const ImageHook = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const validateImage = () => {
    try {
      const parsedImage = imageValidationSchema.validateSync({
        imageLength: selectedImages.length,
        selectedImages,
      });
      setErrorMsg(null);
      return parsedImage;
    } catch (error) {
      setErrorMsg(error.message);
      return null;
    }
  }

  const onSelectFile = (event) => {
    const images = Array.from(event.target.files).map((file) => ({
      link: URL.createObjectURL(file),
      blob: file,
    }));
    setSelectedImages((prevImages) => prevImages.concat(images));

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
      errorMsg
    },
    validateImage
  }
}

const ImageCard = ({link, name, onClick}) => (
  <div
    className="flex flex-col justify-center items-center relative border-2 border-secondary w-1/3">
    <Image
      alt={name}
      src={link}
      width={500}
      height={500}
      className="object-contain"
    />
    <button className="relative" onClick={() => onClick(link)}>
      Remove image
    </button>
  </div>)

ImageCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
const ImageForm = ({useImageHook}) => {
  const {selectedImages, onSelectFile, imageDeleteHandler, errorMsg} = useImageHook;

  return (<CardBackground>
    <ErrorMessage errorMsg={errorMsg}/>
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

    <label
      className="flex justify-center w-full h-40 px-4 transition bg-white border-2 border-accent border-dashed rounded-md appearance-none cursor-pointer hover:border-accent-focus focus:outline-none">
      <span className="flex items-center space-x-4">
        <div
          className="btn btn-ghost normal-case text-xl rounded-2xl bg-accent hover:bg-accent-focus">
                  Upload Images
        </div>
        <span className="text-xs text-gray-600 text-center my-6">
                  or drag it into this box
        </span>
      </span>
      <input
        type="file"
        className="hidden"
        onChange={onSelectFile}
        multiple
        accept="image/png, image/jpeg, image/webp"
      />
    </label>
    {selectedImages && (
      <div className="flex flex-row justify-between w-full">
        {selectedImages.map((image) => (
          <ImageCard key={image.link} link={image.link} name={image.link.name}
            onClick={imageDeleteHandler}/>
        ))}
      </div>
    )}
  </CardBackground>)
}

ImageForm.useHook = ImageHook;

ImageForm.propTypes = {
  useImageHook: PropTypes.shape({
    selectedImages: PropTypes.arrayOf(PropTypes.string),
    onSelectFile: PropTypes.func,
    imageDeleteHandler: PropTypes.func,
    errorMsg: PropTypes.string
  }).isRequired,
}

export default ImageForm;
