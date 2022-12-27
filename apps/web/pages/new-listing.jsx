/* eslint-disable indent */
import Image from 'next/image';
import { NextResponse } from 'next/server';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import crypto from 'crypto';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Log from '@inc/utils/logger';

import CardBackground from '../components/CardBackground';
import CategoricalForm from '../components/layouts/CategoricalForm';
import ListingForm from '../components/layouts/ListingForm';

const sampleData = [
  {
    id: 1,
    category: 'Hollow Section',
    subcategory: [
      { id: 1, category: 'Hollow 1' },
      { id: 2, category: 'Hollow 2' },
    ],
  },
  {
    id: 2,
    category: 'Steel',
    subcategory: [
      { id: 1, category: 'Steel 1' },
      { id: 2, category: 'Steel 2' },
    ],
  },
  {
    id: 3,
    category: 'Cement',
    subcategory: [
      { id: 1, category: 'Cement 1' },
      { id: 2, category: 'Cement 2' },
    ],
  },
  {
    id: 4,
    category: 'Bricks',
  },
];

const NewListing = ({ session }) => {
  const supabaseClient = useSupabaseClient();

  const [type, setType] = useState(null);
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [blobSelectedImages, setBlobSelectedImages] = useState([]);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [negotiable, setNegotiable] = useState(false);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    status: categoriesStatus,
  } = useQuery('get_all_categories', () => supabaseClient.rpc('get_all_categories'), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      setCategory(data.data);
    },
  });

  const handleTypeChange = (event) => {
    if (event.target.value === 'Buying') {
      setType(1);
      return;
    }

    setType(2);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onSelectFile = (event) => {
    setBlobSelectedImages(Array.from(event.target.files));

    const images = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => prevImages.concat(images));

    // chrome bug fix
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const handleImageDelete = (image) => {
    setSelectedImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const handleNewListing = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(price);
    console.log(description);
    console.log(negotiable);

    const { data } = await supabaseClient
      .from('listing')
      .insert({
        name,
        description,
        price,
        unit_price: false || true,
        negotiable,
        category: '1',
        type,
        owner: 'c078a5eb-e75e-4259-8fdf-2dc196f06cbd', // THIS IS ELON MUSK
      })
      .returns('id');

    const uuidArray = [];
    blobSelectedImages.forEach(async (image, index) => {
      const randomUUID = crypto.randomUUID();
      await supabaseClient.storage.from('listing-image-bucket').upload(randomUUID, image);
      uuidArray[index] = { listing: data[0].id, image: randomUUID };
    });

    await supabaseClient.from('listing').insert(uuidArray);

    // NextResponse.redirect(`/listing/${data[0].id}`);
  };

  return (
    <main>
      <div className="flex flex-col lg:flex-row justify-around mt-8 mx-32 space-y-6 lg:space-y-0">
        <div className="flex space-y-6 flex-col w-full lg:w-2/6">
          {!categoriesLoading &&
            !categoriesError &&
            categoriesStatus === 'success' &&
            allCategories && (
              <CategoricalForm items={sampleData} onChangeValue={handleCategoryChange} />
            )}
          <CardBackground>
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
                    <button className="relative" onClick={() => handleImageDelete(image)}>
                      Remove image
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardBackground>
        </div>
        <div className="flex flex-col w-full lg:w-3/5">
          <CardBackground>
            <ListingForm
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              description={description}
              setDescription={setDescription}
              negotiable={negotiable}
              setNegotiable={setNegotiable}
              options={['Buying', 'Selling']}
              onChangeValue={handleTypeChange}
              typeHandler={type}
              onSubmit={handleNewListing}
            />
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
