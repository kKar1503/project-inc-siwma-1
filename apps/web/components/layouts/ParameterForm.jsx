import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { boolean, number, object, string } from 'yup';
import CardBackground from '../CardBackground';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Tooltip from '../marketplace/Tooltip';
import RadioButton from '../RadioButton';
import ErrorMessage from './ErrorMessage';

// const typeDataSchema = object('Please fill in the values').shape({
//   id: number('Please fill in the values').required('Please fill in the values'),
//   typeId: number('Please fill in the values').required('Please fill in the values'),
//   dataTypeId: number('Please fill in the values').required('Please fill in the values')
// }).required('Please fill in the values');

const propTypes = {
  crossSectionImage: PropTypes.string.isRequired,
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

// Validation
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

  const getValue = (name) => values[name]?.value;

  const updateValues = (name, value) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      console.log(newValues);
      newValues[name].value = value;
      return newValues;
    });
  };

  const validateParam = (dataTypeId, id, value) => {
    switch (dataTypeId) {
      case 2:
        return ParameterValidationSchemaNumber.validateSync({ id, value }, { stripUnknown: true });
      case 3:
        return ParameterValidationSchemaBoolean.validateSync({ id, value }, { stripUnknown: true });
      default:
        return ParameterValidationSchemaString.validateSync({ id, value }, { stripUnknown: true });
    }
  };

  const validateParameter = () => {
    const validated = [];
    const objectValues = Object.values(values);
    for (let i = 0; i < objectValues.length; i++) {
      const { value, typeData } = objectValues[i];
      const { id, dataTypeId, required } = typeData;

      try {
        if (
          required ||
          !(value === undefined || value === null || value === '' || value === 'None')
        ) {
          validated.push(validateParam(dataTypeId, id, value));
        }
      } catch (error) {
        if (error.message.includes('value must be a `number` type')) {
          if (value === '') setErrorMsg(`Please fill in the values for all parameters`);
          else setErrorMsg(`${value} is not a valid number`);
          return false;
        }
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

  // Parameter Sorter
  // Parameters have two sets of values (parameter values/parameter choices)
  // Every Parameter has a type
  // Choice type Parameters have parameter choices
  // This function identifies the parameter type and choices of every parameter of the category
  const identifyParameterType = useMemo(
    () => async (parameterData, parameterType, parameterChoice) => {
      const formTypes = [];

      for (let i = 0; i < parameterData.length; i++) {
        for (let j = 0; j < parameterType.length; j++) {
          if (parameterData[i].type === parameterType[j].id) {
            const formData = {
              id: parameterData[i].parameter,
              name: parameterData[i].display_name,
              required: parameterData[i].required,
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
      setValues(
        formTypes.reduce((acc, item) => {
          acc[item.id] = {
            typeData: item,
          };
          return acc;
        }, {})
      );
      setFormTypeData(formTypes);
    },
    []
  );

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

/**
 * Parameter Form is a component that renders the form for the parameters.
 * They are rendered depending on the category selected
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const ParameterForm = ({ crossSectionImage, parameterHook }) => {
  const { formTypes, errorMsg, getValue, updateValues } = parameterHook;

  return (
    <CardBackground>
      <ErrorMessage errorMsg={errorMsg} />

      <div className="flex flex-wrap items-center gap-2">
        <h1 className="font-bold text-3xl">Parameters</h1>
        <Tooltip
          content={
            <picture>
              <img src={crossSectionImage} alt="Reference for" className="w-44 my-3" />
            </picture>
          }
          contentClassName="bg-white p-2 rounded-lg shadow-lg"
          position="right"
        >
          <IoHelpCircleOutline className="text-xl text-gray-500" />
        </Tooltip>
      </div>
      {/* {formSorter(formTypes)} */}
      {formTypes.map((item) => {
        switch (item.type) {
          case 'MEASUREMENT (WEIGHT)':
            return (
              <Input
                isOptional={!item.required}
                key={item.name}
                text={`${item.name} (g)`}
                value={getValue(item.id) || ''}
                onChange={(e) => {
                  updateValues(item.id, e.target.value);
                }}
              />
            );
          case 'MEASUREMENT (DIMENSION)':
            return (
              <Input
                isOptional={!item.required}
                key={item.name}
                text={`${item.name} (mm)`}
                value={getValue(item.id) || ''}
                onChange={(e) => {
                  updateValues(item.id, e.target.value);
                }}
              />
            );
          case 'TWO CHOICES':
            return (
              <RadioButton
                isOptional={!item.required}
                text={item.name}
                options={item.choice}
                onChangeValue={(e) => {
                  updateValues(item.id, e.target.value);
                }}
              />
            );
          case 'MANY CHOICES':
            return (
              <Dropdown
                isOptional={!item.required}
                items={item.choice}
                onChangeValue={(e) => {
                  updateValues(item.id, e.target.value);
                }}
                defaultValue={`${item.name}`}
              />
            );
          case 'OPEN ENDED':
            return (
              <Input
                isOptional={!item.required}
                key={item.name}
                type="textarea"
                text={`${item.name}`}
                value={getValue(item.id) || ''}
                onChange={(e) => {
                  updateValues(item.id, e.target.value);
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

ParameterForm.propTypes = propTypes;
ParameterForm.useHook = ParameterHook;

export default ParameterForm;
