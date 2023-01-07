import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import CardBackground from '../CardBackground';

// check parameter_types/parameter_choices
const ParameterForm  = ({ items }) => (
  <CardBackground>
    <h1 className="font-bold text-3xl">Parameters</h1>
    {items.map((item) => (
      <div key={item.id}>
        <h2 className="font-bold text-xl">{item.name}</h2>
      </div>
    ))}
  </CardBackground>
);    

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