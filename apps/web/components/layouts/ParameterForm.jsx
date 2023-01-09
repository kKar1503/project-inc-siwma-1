import React from 'react';
import PropTypes from 'prop-types';
import Log from '@inc/utils/logger';
import {useQuery} from 'react-query';
import {useSupabaseClient} from '@supabase/auth-helpers-react';
import CardBackground from '../CardBackground';

// check parameter_types/parameter_choices
const ParameterForm  = ({ parameters }) => {
  const client = useSupabaseClient();

  const [parameterTypes, setParameterTypes] = React.useState([]);
  const [parameterChoices, setParameterChoices] = React.useState([]);
  const [formData, setFormData] = React.useState([]);

  const identifyParameterType = async (data) => {
    const formTypes = [];

    for (let i = 0; i < parameters.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (parameters[i].type === data[j].id) {
          formTypes.push({ name: parameters[i].display_name, type: data[j].name});
        }
      }
    }

    setFormData(formTypes);
  };

  const identifyParamterChoice = () => {

  }
  
  // const urMother = (data) => {
  //   for(let i = 0; i < data.length; i++) {
  //     if ()
  //   }
  //   return (

  //   );
  // }

  useQuery('get_parameter_types', async () => client.rpc('get_parameter_types'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (parameterTypesAPIData) => {
      Log('green', parameterTypesAPIData.data);
      setParameterTypes(parameterTypesAPIData.data);
    }
  });

  // useQuery('get_parameter_choices', async () => client.rpc('get_parameter_choices'), {
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  //   onSuccess: (parameterChoicesAPIData) => {
  //     Log('green', parameterChoicesAPIData.data);
  //     setParameterChoices(parameterChoicesAPIData.data);
  //   }
  // });

  return (
    <CardBackground>
      <h1 className="font-bold text-3xl">Parameters</h1>
      {parameters.map((item) => (
        <h2 key={item.name} className="font-bold text-xl">{item.name}</h2>
      ))}
    </CardBackground>
  );
};    

ParameterForm.propTypes = {
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.number,
      parameter: PropTypes.number,
      name: PropTypes.string,
      display_name: PropTypes.string,
      type: PropTypes.number,
      datatype: PropTypes.number,
      active: PropTypes.bool,
      required: PropTypes.bool,
      updated_at: PropTypes.string,
      created_at: PropTypes.string,
    })
  ),
};

export default ParameterForm;