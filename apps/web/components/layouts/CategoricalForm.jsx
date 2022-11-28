import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import CardBackground from '../CardBackground';

const CategoricalForm = ({ items }) => (
  <CardBackground>
    <h1 className="font-bold text-3xl">Category</h1>
    <Dropdown items={items} />
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
};

export default CategoricalForm;
