import React from 'react';
import PropTypes from 'prop-types';
import Log from '@inc/utils/logger';
import {useQuery} from 'react-query';
import {useSupabaseClient} from '@supabase/auth-helpers-react';
import CardBackground from '../CardBackground';

// check parameter_types/parameter_choices
const ParameterForm  = ({ items }) => {
  const client = useSupabaseClient();

  const [parameterTypes, setParameterTypes] = React.useState([]);
  const [parameterChoices, setParameterChoices] = React.useState([]);
  const [formTypes, setFormTypes] = React.useState([]);

  const identifyParameterType = () => {
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < parameterTypes.length; j++) {
        if (items[i].type === parameterTypes[j].id) {
          formTypes.push({ name: items[i].display_name, type: parameterTypes[j].name});
        }
      }
    }
  }

  const identifyParamterChoice = () => {

  }

  useQuery('get_parameter_types', async () => client.rpc('get_parameter_types'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (parameterTypesAPIData) => {
      Log('green', parameterTypesAPIData.data);
      setParameterTypes(parameterTypesAPIData.data);
    }
  });

  useQuery('get_parameter_choices', async () => client.rpc('get_parameter_choices'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (parameterChoicesAPIData) => {
      Log('green', parameterChoicesAPIData.data);
      setParameterChoices(parameterChoicesAPIData.data);
    }
  });

  return (
    <CardBackground>
      <h1 className="font-bold text-3xl">Parameters</h1>
      {items.map((item) => (
        <h2 key={item.name} className="font-bold text-xl">{item.name}</h2>
      ))}
    </CardBackground>
  );
};    

ParameterForm.propTypes = {
  items: PropTypes.arrayOf(
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