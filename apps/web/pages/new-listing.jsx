import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import CategoricalForm from '../components/layouts/CategoricalForm';
import ParameterForm from '../components/layouts/ParameterForm';
import ListingForm from '../components/layouts/ListingForm';
import ImageForm from '../components/layouts/ImageForm';

const NewListing = () => {
  const router = useRouter();
  const user = useUser();
  const client = useSupabaseClient();

  const { categoryID, categoryHook, validateCategory } = CategoricalForm.useHook();
  const { imageHook, validateImage } = ImageForm.useHook();
  const { listingHook, validateListing } = ListingForm.useHook();
  const { parameterHook, validateParameter, identifyParameterType } = ParameterForm.useHook();

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

  const { data: parameterTypesData } = useQuery(
    'get_parameter_types',
    async () => client.rpc('get_parameter_types'),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const { data: parameterChoicesData } = useQuery(
    'get_parameter_choices',
    async () => client.rpc('get_parameter_choices'),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const {
    data: parametersData,
    isLoading: parametersLoading,
    isError: parametersError,
    status: parametersStatus,
  } = useQuery(
    ['get_category_parameters', categoryID],
    async () => client.rpc('get_category_parameters', { _category_id: categoryID }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (
      parameterTypesData &&
      parametersData &&
      parametersData.data &&
      parameterTypesData.data &&
      parameterChoicesData &&
      parameterChoicesData.data
    ) {
      identifyParameterType(
        parametersData.data,
        parameterTypesData.data,
        parameterChoicesData.data
      );
    }
    // FIXME: i have no clue what is causing this error
    // because adding the dep inside causes a loopy error
  }, [parametersData, parameterTypesData, parameterChoicesData]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const listing = validateListing();
    const images = validateImage();
    const category = validateCategory();
    const parameters = validateParameter();

    if (!listing || !images || !category || !parameters) return;

    const { data: listingId, error: insertListingError } = await client
      .from('listing')
      .insert({
        name: listing.name,
        description: listing.description,
        price: listing.price,
        negotiable: listing.negotiable,
        category: category.categoryId,
        type: listing.type === 'Buying' ? 1 : 2,
        owner: user.id,
      })
      .select('id');

    if (insertListingError) throw insertListingError;

    const parameterPromises = parameters.map(async (parameter) =>
      client.from('listings_parameters_value').insert({
        listing: listingId[0].id,
        parameter: parameter.id,
        value: parameter.value,
      })
    );

    const imagePromises = images.selectedImages.map((image) => {
      const uuid = crypto.randomUUID();
      const promise1 = client.storage.from('listing-image-bucket').upload(uuid, image.blob);
      const promise2 = client.from('listings_images').insert({
        listing: listingId[0].id,
        image: uuid,
      });
      return Promise.all([promise1, promise2]);
    });

    const promises = Promise.all([...parameterPromises, ...imagePromises]);

    const { error: insertError } = await promises;

    if (insertError) throw insertError;

    router.push(`/product/${listingId[0].id}`)
  };

  return (
    <main>
      <div className="flex justify-around mt-8 mx-32">
        <div className="flex space-y-6 flex-col w-2/6">
          {!categoriesLoading &&
            !categoriesError &&
            categoriesStatus === 'success' &&
            categoriesData && (
            <CategoricalForm items={categoriesData.data} categoryHook={categoryHook} />
          )}

          {!parametersLoading &&
            !parametersError &&
            parametersStatus === 'success' &&
            parametersData.data.length !== 0 && <ParameterForm parameterHook={parameterHook} />}

          <ImageForm useImageHook={imageHook} />
        </div>
        <div className="flex flex-col w-3/5">
          <ListingForm listingHook={listingHook} onSubmit={onSubmit} />
        </div>
      </div>
    </main>
  );
};

NewListing.allowAuthenticated = true;

export default NewListing;
