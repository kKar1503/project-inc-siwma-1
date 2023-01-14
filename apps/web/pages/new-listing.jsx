import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import Container from '../components/Container';
import CategoricalForm from '../components/layouts/CategoricalForm';
import ImageForm from '../components/layouts/ImageForm';
import ListingForm from '../components/layouts/ListingForm';
import ParameterForm from '../components/layouts/ParameterForm';

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
  }, [parametersData, parameterTypesData, parameterChoicesData, identifyParameterType]);

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
        unit_price: listing.unitPrice,
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

    const imagePromises = images.map((image) => {
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

    router.push(`/product/${listingId[0].id}`);
  };

  const canShowCategoriesForm =
    !categoriesLoading && !categoriesError && categoriesStatus === 'success' && categoriesData;

  const canShowParametersForm =
    !parametersLoading &&
    !parametersError &&
    parametersStatus === 'success' &&
    parametersData.data.length !== 0;

  return (
    <Container>
      <ImageForm useImageHook={imageHook} />

      {canShowCategoriesForm && (
        <CategoricalForm items={categoriesData.data} categoryHook={categoryHook} />
      )}

      {canShowParametersForm && <ParameterForm parameterHook={parameterHook} />}

      <ListingForm listingHook={listingHook} onSubmit={onSubmit} />
    </Container>
  );
};

NewListing.allowAuthenticated = true;

export default NewListing;
