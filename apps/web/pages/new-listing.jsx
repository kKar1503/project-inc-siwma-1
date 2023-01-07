import React from 'react';
import PropTypes from 'prop-types';
import crypto from 'crypto';
import {useQuery} from 'react-query';
import {useSupabaseClient} from '@supabase/auth-helpers-react';
import Log from '@inc/utils/logger';
import CardBackground from '../components/CardBackground';
import CategoricalForm from '../components/layouts/CategoricalForm';
import ParameterForm from '../components/layouts/ParameterForm';
import ListingForm from '../components/layouts/ListingForm';
import ImageForm from '../components/layouts/ImageForm';

const NewListing = ({session}) => {
  const client = useSupabaseClient();

  const [type, setType] = React.useState(null);
  const [categoryID, setCategoryID] = React.useState(null);
  const [allCategories, setAllCategories] = React.useState([]);
  const [parameters, setParameters] = React.useState([]);
  const [blobSelectedImages, setBlobSelectedImages] = React.useState([]);

  // Form states
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [negotiable, setNegotiable] = React.useState(false);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    status: categoriesStatus,
  } = useQuery('get_all_categories', async () => client.rpc('get_all_categories'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: parametersData,
    isLoading: parametersLoading,
    isError: parametersError,
    status: parametersStatus,
  } = useQuery(['get_category_parameters', categoryID], async () => client.rpc('get_category_parameters', {_category_id: categoryID}), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (parameterAPIData) => {
      setParameters(parameterAPIData.data);
      console.log(parameterAPIData.data);
    }
  });

  React.useEffect(() => {
    if (categoriesStatus === 'success') {
      Log('green', categoriesData.data);
      setAllCategories(categoriesData.data);
    }
  }, [session, categoriesStatus, categoriesData]);

  const handleTypeChange = (event) => {
    setType(event.target.value === 'Buying' ? 1 : 2);

    if (event.target.value === 'Buying') {
      setType(1);
      return;
    }

    setType(2);
  };

  const handleCategoryChange = (event) => {
    setCategoryID(event.target.value);
  };


  const insertNewListingHandler = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(price);
    console.log(description);
    console.log(negotiable);

    const {data} = await client
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
      await client.storage.from('listing-image-bucket').upload(randomUUID, image);
      uuidArray[index] = {listing: data[0].id, image: randomUUID};
    });

    await client.from('listing').insert(uuidArray);

    // NextResponse.redirect(`/listing/${data[0].id}`);
  };


  return (
    <main>
      <div className="flex justify-around mt-8 mx-32">
        <div className="flex space-y-6 flex-col w-2/6">
          {!categoriesLoading &&
            !categoriesError &&
            categoriesStatus === 'success' &&
            allCategories && (
            <CategoricalForm items={categoriesData.data} onChangeValue={handleCategoryChange}/>
          )}

          {!parametersLoading &&
            !parametersError &&
            parametersStatus === 'success' &&
            parameters.length !== 0 && (
            <ParameterForm items={parametersData.data}/>
          )}
          <ImageForm setBlobSelectedImages={setBlobSelectedImages}/>
        </div>
        <div className="flex flex-col w-3/5">
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
              onSubmit={insertNewListingHandler}
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
