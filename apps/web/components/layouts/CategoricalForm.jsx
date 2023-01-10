import {useState} from 'react';
import PropTypes from 'prop-types';
import {number, object} from 'yup';
import Dropdown from '../Dropdown';
import CardBackground from '../CardBackground';
import ErrorMessage from './ErrorMessage';

const categoryValidationSchema = object({
  categoryId: number('Please select a category').required('Please select a category').positive('Please select a category'),
},'Please select a category')


const CategoryHook = () => {
  const [categoryId, setCategoryID] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onChangeValue = (event) => {
    setCategoryID(event.target.value);
  };

  const validateCategory = () => {
    try {
      const parsedCategory = categoryValidationSchema.validateSync({
        categoryId
      });
      setErrorMsg(null);
      return parsedCategory;
    } catch (error) {
      setErrorMsg('A category must be selected');
      return null;
    }
  }

  return {
    categoryHook: {
      errorMsg,
      onChangeValue,
    },
    categoryID: categoryId,
    validateCategory
  };
}

const CategoricalForm = ({items, categoryHook}) => {
  const {errorMsg,onChangeValue} = categoryHook;
  return (
    <CardBackground>
      <ErrorMessage errorMsg={errorMsg}/>
      <h1 className="font-bold text-3xl">Category</h1>
      <Dropdown items={items} onChangeValue={onChangeValue} defaultValue='Category' itemType='Object'/>
    </CardBackground>
  );
};

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
  categoryHook: PropTypes.shape({
    onChangeValue: PropTypes.func.isRequired,
    errorMsg: PropTypes.string,
  }).isRequired,
};

CategoricalForm.useHook = CategoryHook;

export default CategoricalForm;
