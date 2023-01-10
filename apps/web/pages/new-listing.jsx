import {NextResponse} from 'next/server';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useSupabaseClient, useUser} from '@supabase/auth-helpers-react';
import CategoricalForm from '../components/layouts/CategoricalForm';
import ParameterForm from '../components/layouts/ParameterForm';
import ListingForm from '../components/layouts/ListingForm';
import ImageForm from '../components/layouts/ImageForm';

const NewListing = () => {
  const user = useUser();
  const client = useSupabaseClient();
  // EnsureUserLoggedIn();
  const [formTypeData, setFormTypeData] = useState([]);

  const {categoryID, categoryHook, validateCategory} = CategoricalForm.useHook();
  const {imageHook, validateImage} = ImageForm.useHook();
  const {listingHook, validateListing} = ListingForm.useHook();

  const identifyParameterType = async (parameterData, parameterType, parameterChoice) => {
    const formTypes = [];
    let formData = {};

    // match parameter types to individual parameters via the key id
    for (let i = 0; i < parameterData.length; i++) {
      for (let j = 0; j < parameterType.length; j++) {
        if (parameterData[i].type === parameterType[j].id) {
          formData = {
            id: parameterData[i].parameter,
            name: parameterData[i].display_name,
            type: parameterType[j].name,
            choice: null
          };

          for (let k = 0; k < parameterChoice.length; k++) {
            if (parameterData[i].parameter === parameterChoice[k].parameter) {
              formData.choice = parameterChoice[k].choice;
            }
          }

          formTypes.push(formData);
        }
      }
    }

    setFormTypeData(formTypes);
  };

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
    data: parameterTypesData,
  } = useQuery('get_parameter_types', async () => client.rpc('get_parameter_types'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: parameterChoicesData,
  } = useQuery('get_parameter_choices', async () => client.rpc('get_parameter_choices'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: parametersData,
    isLoading: parametersLoading,
    isError: parametersError,
    status: parametersStatus,
  } = useQuery(
    ['get_category_parameters', categoryID],
    async () => client.rpc('get_category_parameters', {_category_id: categoryID}),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (parameterTypesData && parametersData && parametersData.data && parameterTypesData.data && parameterChoicesData && parameterChoicesData.data) {
      identifyParameterType(parametersData.data, parameterTypesData.data, parameterChoicesData.data);
    }
  }, [parametersData, parameterTypesData, parameterChoicesData]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const listing = validateListing();
    const images = validateImage();
    const category = validateCategory();
    const parameters = []

    if (!listing || !images || !category) return;

    const {data: listingId, error: insertListingError} = await client
      .from('listing')
      .insert({
        listing: listing.name,
        description: listing.description,
        price: listing.price,
        negotiable: listing.negotiable,
        category: category.categoryId,
        type: (listing.type === 'Buying' ? 1 : 2),
        owner: user.id,
      })
      .returns('id');

    if (insertListingError) throw new Error(insertListingError.message);

    const parameterPromises = parameters.map(async (parameter) => client.from('listing').insert({
      listing: listingId.data,
      parameter,
      // TODO: wait for the parameter form to be done
      // value,
    }));

    const imagePromises = images.images.map((image) => {
      const uuid = crypto.randomUUID();
      const promise1 = client.storage
        .from('listing-image-bucket')
        .upload(uuid, image.blob);
      const promise2 = client.from('listing_images').insert({
        listing: listingId.data,
        image: uuid,
      })
      return Promise.all([promise1, promise2]);
    });

    const promises = Promise.all([...parameterPromises, ...imagePromises]);

    const {error: insertError} = await promises;

    if (insertError) throw new Error(insertError.message);

    NextResponse.redirect(`/listing/${listingId[0].id}`);
  };

  return (
    <main>
      <div className="flex justify-around mt-8 mx-32">
        <div className="flex space-y-6 flex-col w-2/6">
          {!categoriesLoading &&
            !categoriesError &&
            categoriesStatus === 'success' &&
            categoriesData && (
            <CategoricalForm items={categoriesData.data} categoryHook={categoryHook}/>
          )}

          {!parametersLoading &&
            !parametersError &&
            parametersStatus === 'success' &&
            parametersData.data.length !== 0 && formTypeData !== null && (
            <ParameterForm formTypes={formTypeData}/>
          )}

          <ImageForm useImageHook={imageHook}/>
        </div>
        <div className="flex flex-col w-3/5">
          <ListingForm listingHook={listingHook} onSubmit={onSubmit}/>
        </div>
      </div>
    </main>
  );
};
export default NewListing;
