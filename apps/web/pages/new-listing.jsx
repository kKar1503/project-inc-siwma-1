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

  const [categoryID, setCategoryID] = React.useState(null);
  const [allCategories, setAllCategories] = React.useState([]);
  const [parameters, setParameters] = React.useState([]);
  const [parameterTypes, setParameterTypes] = React.useState([]);
  const [parameterChoices, setParameterChoices] = React.useState([]);

  const [formTypeData, setFormTypeData] = React.useState([]);
  // const [formChoiceData, setFormChoiceData] = React.useState([]);

  // used for image form
  const {selectedImages, imageHook} = ImageForm.UseHook();

  // Form states
  const {listingHook} = ListingForm.UseHook();

  // const identifyParameterType = async (parameterData, parameterType) => {
  //   const formTypes = [];

  //   // match paramter types to individual parameters via the key id 
  //   for (let i = 0; i < parameterData.length; i++) {
  //     for (let j = 0; j < parameterType.length; j++) {
  //       if (parameterData[i].type === parameterType[j].id) {
  //         formTypes.push({ id: parameterType[j].id, name: parameterData[i].display_name, type: parameterType[j].name});
  //       }
  //     }
  //   }

  //   setFormTypeData(formTypes);
  // };

  const identifyParameterType = async (parameterData, parameterType, parameterChoice) => {
    const formTypes = [];
    let formData = {};

    // match paramter types to individual parameters via the key id 
    for (let i = 0; i < parameterData.length; i++) {
      for (let j = 0; j < parameterType.length; j++) {
        if (parameterData[i].type === parameterType[j].id) {
          formData = { id: parameterData[i].parameter, name: parameterData[i].display_name, type: parameterType[j].name, choice: null};

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
    console.log(formTypes);
  };
  
  // const identifyParameterChoice = async (parameterData, parameterChoice) => {
  //   const formChoices = [];

  //   // match paramter types to individual parameters via the key id 
  //   for (let i = 0; i < parameterData.length; i++) {
  //     for (let j = 0; j < parameterChoice.length; j++) {
  //       if (parameterData[i].id === parameterChoice[j].parameter) {
  //         formChoices.push({ id: parameterData[i].id, name: parameterData[i].display_name, choice: parameterChoice[j].choice});
  //       }
  //     }
  //   }

  //   setFormChoiceData(formChoices);
  // }

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    status: categoriesStatus,
  } = useQuery('get_all_categories', async () => client.rpc('get_all_categories'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (categoryAPIData) => {
      Log('green', categoryAPIData.data);
      setAllCategories(categoryAPIData.data);
    }
  });

  const {
    data: parameterTypesData,
  } = useQuery('get_parameter_types', async () => client.rpc('get_parameter_types'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (parameterTypesAPIData) => {
      Log('green', parameterTypesAPIData.data);
      setParameterTypes(parameterTypesAPIData.data);
    }
  });

  const {
    data: parameterChoicesData,
  } = useQuery('get_parameter_choices', async () => client.rpc('get_parameter_choices'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (parameterChoicesAPIData) => {
      Log('green', parameterChoicesAPIData.data);
      setParameterChoices(parameterChoicesAPIData.data);
    }
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
      Log('green', parameterAPIData.data);
      setParameters(parameterAPIData.data);
    }
  });

  React.useEffect(() => {
    console.log(formTypeData);
    // console.log(formChoiceData);
  }, [formTypeData]);

  React.useEffect(() => {
    if (parameterTypesData && parametersData && parametersData.data && parameterTypesData.data && parameterChoicesData && parameterChoicesData.data) {
      identifyParameterType(parametersData.data, parameterTypesData.data, parameterChoicesData.data);
    };
  }, [parameters, parameterTypes, parameterChoices]);

  const handleCategoryChange = (event) => {
    setCategoryID(event.target.value);
  };

  const insertNewListingHandler = async (e,values) => {
    e.preventDefault();
    const {name, price, description, negotiable, type} = values;
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
        unit_price: false,
        negotiable,
        category: '1',
        type,
        owner: 'c078a5eb-e75e-4259-8fdf-2dc196f06cbd', // THIS IS ELON MUSK
      })
      .returns('id');

    const uuidArray = [];
    selectedImages.forEach(async (image, index) => {
      const randomUUID = crypto.randomUUID();
      await client.storage.from('listing-image-bucket').upload(randomUUID, image.blob);
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
            parameters.length !== 0 && formTypeData !== null && (
            <ParameterForm formTypes={formTypeData}/>
          )}

          <ImageForm useImageHook={imageHook}/>
        </div>
        <div className="flex flex-col w-3/5">
          <CardBackground>
            <ListingForm
              listingHook={listingHook}
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
