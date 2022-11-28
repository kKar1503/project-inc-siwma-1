import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Log from '@inc/utils/logger';
import CardBackground from '../components/CardBackground';
import Input from '../components/Input';
import ListingForm from '../components/layouts/ListingForm';

const NewListing = ({ session }) => {
  const client = useSupabaseClient();

  const [allCategories, setAllCategories] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);

  const onSelectFile = (event) => {
    const selectedImagesArray = Array.from(event.target.files).map((image) =>
      URL.createObjectURL(image)
    );

    setSelectedImages((prevImages) => prevImages.concat(selectedImagesArray));

    // chrome bug fix
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const imageDeleteHandler = (image) => {
    setSelectedImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const { data, isLoading, isError, status } = useQuery(
    'get_all_categories',
    async () => client.rpc('get_all_categories'),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (status === 'success') {
      Log('green', data);
      setAllCategories(data);
    }
  }, [session, status, data]);

  return (
    <main>
      <div className="flex justify-around mt-8 mx-32">
        <div className="flex space-y-6 flex-col w-2/6">
          <CardBackground>
            {/* max 10 images alert */}
            <div className="alert alert-info shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Max 10 images</span>
              </div>
            </div>

            <label className="flex justify-center w-full h-40 px-4 transition bg-white border-2 border-accent border-dashed rounded-md appearance-none cursor-pointer hover:border-accent-focus focus:outline-none">
              <span className="flex items-center space-x-4">
                <div className="btn btn-ghost normal-case text-xl rounded-2xl bg-accent hover:bg-accent-focus">
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
                  <div
                    key={image}
                    className="flex flex-col justify-center items-center relative border-2 border-secondary w-1/3"
                  >
                    <Image
                      alt={image.name}
                      src={image}
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                    <button className="relative" onClick={() => imageDeleteHandler(image)}>
                      Remove image
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardBackground>
          <CardBackground>
            <h1 className="font-bold text-3xl">Optional Parameters</h1>
            <Input text="Width" />
            <Input text="Height" />
          </CardBackground>
        </div>
        <div className="flex flex-col w-3/5">
          <CardBackground>
            <ListingForm />
          </CardBackground>
        </div>
      </div>
    </main>
  );
};

NewListing.propTypes = {
  session: PropTypes.func,
};

export default NewListing;
