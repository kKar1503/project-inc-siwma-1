import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import CardBackground from '../CardBackground';

const CategoricalForm = ({ items, onChangeValue }) => (
  <CardBackground>
    <h1 className="font-bold text-3xl">Category</h1>
    <Dropdown items={items} onChangeValue={onChangeValue} />
  </CardBackground>
);

CategoricalForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      category: PropTypes.string,
      subcategory: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          category: PropTypes.string,
        })
      ),
    })
  ),
  onChangeValue: PropTypes.func.isRequired,
};

export default CategoricalForm;
