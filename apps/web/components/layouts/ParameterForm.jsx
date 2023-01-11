import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { boolean, number, object, string } from 'yup';
import CardBackground from '../CardBackground';
import Dropdown from '../Dropdown';
import RadioButton from '../RadioButton';
import Input from '../Input';
import ErrorMessage from './ErrorMessage';

// const typeDataSchema = object('Please fill in the values').shape({
//   id: number('Please fill in the values').required('Please fill in the values'),
//   typeId: number('Please fill in the values').required('Please fill in the values'),
//   dataTypeId: number('Please fill in the values').required('Please fill in the values')
// }).required('Please fill in the values');

const ParameterValidationSchemaString = object(
  {
    id: number().required(),
    value: string().required('Please fill in the values'),
  },
  'Please fill in the values'
);

const ParameterValidationSchemaNumber = object(
  {
    id: number().required(),
    value: number().required('Please fill in the values'),
  },
  'Please fill in the values'
);

const ParameterValidationSchemaBoolean = object(
  {
    id: number().required(),
    value: boolean().required('Please fill in the values'),
  },
  'Please fill in the values'
);

const ParameterHook = () => {
  const [formTypeData, setFormTypeData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [values, setValues] = React.useState({});

  useEffect(() => {
    setValues(
      formTypeData.reduce((acc, item) => {
        acc[item.name] = '';
        return acc;
      }, {})
    );
  }, [formTypeData]);

  const getValue = (name) => values[name]?.value;

  const updateValues = (name, typeData, value) => {
    setValues((v) => ({
      ...v,
      [name]: {
        typeData,
        value,
      },
    }));
  };

  const identifyParameterType = async (parameterData, parameterType, parameterChoice) => {
    const formTypes = [];

    // match parameter types to individual parameters via the key id
    for (let i = 0; i < parameterData.length; i++) {
      for (let j = 0; j < parameterType.length; j++) {
        if (parameterData[i].type === parameterType[j].id) {
          const formData = {
            id: parameterData[i].parameter,
            name: parameterData[i].display_name,
            dataTypeId: parameterData[i].datatype,
            type: parameterType[j].name,
            typeId: parameterType[j].id,
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

  const validateParameter = () => {
    const validated = [];
    const objectValues = Object.values(values);
    for (let i = 0; i < objectValues.length; i++) {
      const item = objectValues[i];

      try {
        switch (item.typeData.dataTypeId) {
          case 2:
            validated.push(
              ParameterValidationSchemaNumber.validateSync(
                { id: item.typeData.id, value: item.value },
                { stripUnknown: true }
              )
            );
            break;
          case 3:
            validated.push(
              ParameterValidationSchemaBoolean.validateSync(
                { id: item.typeData.id, value: item.value },
                { stripUnknown: true }
              )
            );
            break;
          default:
            validated.push(
              ParameterValidationSchemaString.validateSync(
                { id: item.typeData.id, value: item.value },
                { stripUnknown: true }
              )
            );
        }
      } catch (error) {
        setErrorMsg(
          error.message.includes('Cannot read properties of undefined')
            ? `Please fill in the values for all parameters`
            : `${error.message}`
        );
        return false;
      }
    }
    setErrorMsg(null);
    return validated;
  };

  return {
    parameterHook: {
      formTypes: formTypeData,
      getValue,
      updateValues,
      errorMsg,
    },
    identifyParameterType,
    validateParameter,
  };
};

// check parameter_types/parameter_choices
// formTypes: { id, name, type}
const ParameterForm = ({ parameterHook }) => {
  const { formTypes, errorMsg, getValue, updateValues } = parameterHook;

  // --- Form Types ---
  // Measurement = Text Input (Weight = g / Dimension = mm)
  // Two Choices = Radio Button
  // Many Choices = Dropdown
  // Open Ended = Text Input
  // --- Form Choices ---
  // Long, Medium, Short
  // Long, Medium
  // Long, Short
  return (
    <CardBackground>
      <ErrorMessage errorMsg={errorMsg} />
      <h1 className="font-bold text-3xl">Parameters</h1>
      {/* {formSorter(formTypes)} */}
      {formTypes.map((item) => {
        switch (item.type) {
          case 'MEASUREMENT (WEIGHT)':
            return (
              <Input
                key={item.name}
                text={`${item.name} (g)`}
                value={getValue(item.name) || ''}
                onChange={(e) => {
                  updateValues(item.name, item, e.target.value);
                }}
              />
            );
          case 'MEASUREMENT (DIMENSION)':
            return (
              <Input
                key={item.name}
                text={`${item.name} (mm)`}
                value={getValue(item.name) || ''}
                onChange={(e) => {
                  updateValues(item.name, item, e.target.value);
                }}
              />
            );
          case 'TWO CHOICES':
            return (
              <RadioButton
                options={item.choice}
                onChangeValue={(e) => {
                  updateValues(item.name, item, e.target.value);
                }}
              />
            );
          case 'MANY CHOICES':
            return (
              <Dropdown
                items={item.choice}
                onChangeValue={(e) => {
                  updateValues(item.name, item, e.target.value);
                }}
                defaultValue={`${item.name}`}
              />
            );
          case 'OPEN ENDED':
            return (
              <Input
                key={item.name}
                type="textarea"
                text={`${item.name}`}
                value={getValue(item.name) || ''}
                onChange={(e) => {
                  updateValues(item.name, item, e.target.value);
                }}
              />
            );
          default:
            return null;
        }
      })}
    </CardBackground>
  );
};

ParameterForm.propTypes = {
  parameterHook: PropTypes.shape({
    formTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
        choice: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    getValue: PropTypes.func.isRequired,
    updateValues: PropTypes.func.isRequired,
    errorMsg: PropTypes.string,
  }).isRequired,
};
ParameterForm.useHook = ParameterHook;

export default ParameterForm;
