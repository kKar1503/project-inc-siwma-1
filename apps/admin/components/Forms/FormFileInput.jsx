import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { hasFileExt, arrayToString } from '@inc/utils';
import { useFormContext, useWatch } from 'react-hook-form';

/**
 * Wrapper component for a react hook form file input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A file input that works with react form hook
 */
const FormFileInput = ({
  name,
  label,
  placeholder,
  customValidation,
  required,
  success,
  className,
  style,
}) => {
  // -- React Hook Form -- //
  // Use form context and deconstruct required hooks from the form object
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    control,
  } = useFormContext();

  // Hooks inputs to using react form hook
  const hookInput = (inputName, inputLabel, options) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      maxLength: { value: 255, message: `${inputLabel} can only be 255 characters long` },
      ...options,
    });

  // Watches the value of this file input
  const selectedFile = useWatch({ name, control });

  // Initialises a reference to the file input
  const fileInput = useRef(null);

  // -- Functions -- //
  /**
   * Handles new file selections
   * @param {File} file The file that was selected
   */
  const selectFile = (file) => {
    // Check if a file was selected
    if (!file) {
      // No file was selected
      setValue(name, null);
      return;
    }

    // Checks if the file selected is of a valid filetype
    const allowedFileTypes = ['svg', 'png', 'jpg', 'jpeg'];
    if (!hasFileExt(file.name, allowedFileTypes)) {
      // Invalid file type received
      setError(name, {
        type: 'invalidFileType',
        message: `Only ${arrayToString(
          allowedFileTypes.map((e) => e.toUpperCase())
        )} file formats are accepted`,
      });
      return;
    }

    // Valid filetype received
    // Clear any errors present
    clearErrors(name);

    // Get a reference to the blob of the image
    const imageUrl = URL.createObjectURL(file);

    // Update the file object to to have the image url
    const result = file;
    result.src = imageUrl;

    // Set the value of the file input
    setValue(name, result);
  };

  // -- Event handlers -- //
  /**
   * Prevents the default browser behaviour when the user drags a file into the window
   * @param {*} e The drag over event
   */
  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  /**
   * Handles file upload via drag & drop
   * @param {*} e The drop capture event
   */
  const handleDropOver = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Retrieve the file the user has dragged onto the input
    const file = e.dataTransfer.files[0];

    // Select the file
    selectFile(file);
  };

  const handleOnChange = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Retrieve the file the user has dragged onto the input
    const file = e.target.files[0];

    // Select the file
    selectFile(file);
  };

  return (
    <label
      className={cx(
        'flex flex-1 justify-center max-w-full px-8 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none',
        { 'border-error': errors[name] },
        { 'border-success': success }
      )}
      onDragOver={handleDragOver}
      onDrop={handleDropOver}
    >
      {
        // If a valid image file is selected, render the image
        (selectedFile && (
          <div className="rounded-full flex flex-1 justify-center items-center">
            <div className="h-36 w-36 relative">
              <Image
                src={selectedFile.src}
                alt="company logo"
                className="rounded-full object-cover"
                fill
              />
            </div>
          </div>
        )) || (
          // No image file is selected, render a placeholder
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-gray-600"
              fill="full"
              viewBox="0 0 490 490"
              stroke="currentColor"
              strokeWidth="10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M245,0c-9.5,0-17.2,7.7-17.2,17.2v331.2L169,289.6c-6.7-6.7-17.6-6.7-24.3,0s-6.7,17.6,0,24.3l88.1,88.1
				c3.3,3.3,7.7,5,12.1,5c4.4,0,8.8-1.7,12.1-5l88.1-88.1c6.7-6.7,6.7-17.6,0-24.3c-6.7-6.7-17.6-6.7-24.3,0L262,348.4V17.1
				C262.1,7.6,254.5,0,245,0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M462.1,472.9v-99.7c0-9.5-7.7-17.2-17.2-17.2s-17.2,7.7-17.2,17.2v82.6H62.2v-82.6c0-9.5-7.7-17.2-17.1-17.2
				s-17.2,7.7-17.2,17.2v99.7c0,9.5,7.7,17.1,17.2,17.1h399.8C454.4,490,462.1,482.4,462.1,472.9z"
              />
            </svg>
            <span className="font-medium text-sm text-gray-600">
              {placeholder || 'Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)'}
            </span>
          </span>
        )
      }
      <input
        type="file"
        name={name}
        {...hookInput(name, label, customValidation)}
        ref={fileInput}
        onChange={handleOnChange}
        accept="image/png, image/jpeg, image/jpg, image/svg"
        hidden
      />
    </label>
  );
};

const propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation: PropTypes.object,
  required: PropTypes.bool,
  success: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormFileInput.propTypes = propTypes;

export default FormFileInput;
