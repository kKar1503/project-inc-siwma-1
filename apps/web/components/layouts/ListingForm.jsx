import PropTypes from 'prop-types';

import React from 'react';
import RadioButton from '../RadioButton';
import Input from '../Input';

const ListingHook = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [negotiable, setNegotiable] = React.useState(false);
  const [type, setType] = React.useState('');

  // const typeChangeHandler = (event) => {
  //   setType(event.target.value === 'Buying' ? 1 : 2);
  // };

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
      submittedValues: {
        name,
        price,
        description,
        negotiable,
        type,
      }
    }
  }
}

const InvalidError = () => (
  <div className="alert alert-warning shadow-lg">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current text-white flex-shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-white">All fields need to be filled in!</span>
    </div>
  </div>
)

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
    submittedValues,
  } = listingHook;
  return (
    <>
      {type &&
        <InvalidError/>
      }

      <form className="p-5" onSubmit={(event) => onSubmit(event, submittedValues)}>
        {/* Selling/Buying Options */}
        <RadioButton options={['Buying', 'Selling']}
          onChangeValue={(event) => setType(event.target.value)}/>

        {/* Selling/Buying Form */}
        {type === '' ||
          <>
            {/* Title Label */}
            <Input text="Title" value={name} onChange={(e) => setName(e.target.value)} />

            {/* Price Label */}
            <Input text="Price (SGD)" value={price} onChange={(e) => setPrice(e.target.value)} />
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
    </>
  );
}

CreateListingInformation.UseHook = ListingHook;

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
    submittedValues: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      negotiable: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateListingInformation;
