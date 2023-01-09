import React from 'react';
import PropTypes from 'prop-types';
import Log from '@inc/utils/logger';
import CardBackground from '../CardBackground';

import Dropdown from '../Dropdown';
import RadioButton from '../RadioButton';
import Input from '../Input';

// check parameter_types/parameter_choices
// formTypes: { id, name, type}
const ParameterForm  = ({ formTypes }) => {
  const [values, setValues] = React.useState(
    {}
  )
  
  const getValue = (name) => values[name]

  const updateValues = (value, name) => {
    setValues((v) => ({
      ...v,
      [name]: value,
    }))
  }

  React.useEffect(() => {
    setValues(formTypes.reduce((acc, item) => {
      acc[item.name] = ''
      return acc
    }, {}));

  }, [formTypes]);

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
      <h1 className="font-bold text-3xl">Parameters</h1>
      {/* {formSorter(formTypes)} */}
      {formTypes.map((item) => {
        switch (item.type) {
          case 'MEASUREMENT (WEIGHT)':
            return (
              <Input key={item.name} text={`${item.name} /g`} value={getValue(item.name)} onChange = {(e) => {updateValues(e.target.value, item.name)}} />
            );
          case 'MEASUREMENT (DIMENSION)':
            return (
              <Input key={item.name} text={`${item.name} /mm`} value={getValue(item.name)} onChange = {(e) => {updateValues(e.target.value, item.name)}} />
            );
          case 'TWO CHOICES':
            return (
              <RadioButton options={item.choice} onChangeValue = {(e) => {updateValues(e.target.value, item.name)}} />
            );
          case 'MANY CHOICES':
            return (
              <Dropdown items={item.choice} onChangeValue = {(e) => {updateValues(e.target.value, item.name)}} defaultValue={`${item.name}`} />
            );
          case 'OPEN ENDED':
            return (
              <Input key={item.name} type='textarea' text={`${item.name}`} value={getValue(item.name)} onChange = {(e) => {updateValues(e.target.value, item.name)}} />
            );
          default:
            return null;
        }
      })}
    </CardBackground>
  );
};    

ParameterForm.propTypes = {
  formTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      type: PropTypes.string,
      choice: PropTypes.arrayOf(
        PropTypes.string
      )
    })
  ),
};

export default ParameterForm;