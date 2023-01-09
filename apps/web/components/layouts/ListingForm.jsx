import PropTypes from 'prop-types';
import {boolean, number, object, string} from 'yup';
import React from 'react';
import RadioButton from '../RadioButton';
import Input from '../Input';
import ErrorMessage from './ErrorMessage';
import CardBackground from '../CardBackground';

const listingValidationSchema = object({
  name: string().required('Title is required'),
  price: number('Please enter a valid number').required('Price is required').positive('Price must be positive'),
  description: string(),
  negotiable: boolean().required('Negotiable is required'),
  // can only be 'Buying' or 'Selling'
  type: string('Please select either buying or selling').required('Type is required').oneOf(['Buying', 'Selling']),
});

const ListingHook = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [negotiable, setNegotiable] = React.useState(false);
  const [type, setType] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState(null);

  const validateListing = () => {
    try {
      const parsedListing = listingValidationSchema.validateSync({
        name,
        price,
        description,
        negotiable,
        type
      });
      setErrorMsg(null);
      return parsedListing;
    } catch (error) {
      setErrorMsg(error.message);
      return null;
    }
  }

  return {
    listingHook: {
      name,
      setName,
      price,
      setPrice,
      description,
      setDescription,
      negotiable,
      setNegotiable,
      type,
      setType,
      errorMsg,
    },
    validateListing
  }
}
const CreateListingInformation = ({
  onSubmit,
  listingHook,
}) => {
  const {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    negotiable,
    setNegotiable,
    type,
    setType,
    errorMsg,
  } = listingHook;
  return (
    <CardBackground>
      <ErrorMessage errorMsg={errorMsg}/>

      <form className="p-5" onSubmit={onSubmit}>
        {/* Selling/Buying Options */}
        <RadioButton options={['Buying', 'Selling']}
          onChangeValue={(event) => setType(event.target.value)}/>

        {/* Selling/Buying Form */}
        {type === '' ||
          <>
            {/* Title Label */}
            <Input text="Title" value={name} onChange={(e) => setName(e.target.value)}/>

            {/* Price Label */}
            <Input text="Price (SGD)" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <div className="form-control w-1/6 flex flex-row justify-start">
              <label className="label cursor-pointer space-x-4">
                <span className="label-text">Negotiable</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={negotiable}
                  onChange={(e) => setNegotiable(e.target.checked)}
                />
              </label>
            </div>

            {/* Description Label */}
            <Input
              text="Description"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        }


        {/* List Now Submit Btn */}
        {type && (
          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-focus text-primary-content py-2 px-4 rounded mt-5"
            >
              List Now
            </button>
          </div>
        )}
      </form>
    </CardBackground>
  );
}

CreateListingInformation.useHook = ListingHook;

CreateListingInformation.propTypes = {
  listingHook: PropTypes.shape({
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    price: PropTypes.string.isRequired,
    setPrice: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    setDescription: PropTypes.func.isRequired,
    negotiable: PropTypes.bool.isRequired,
    setNegotiable: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    setType: PropTypes.func.isRequired,
    errorMsg: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,

};

export default CreateListingInformation;
