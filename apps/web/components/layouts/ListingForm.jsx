import PropTypes from 'prop-types';

import RadioButton from '../RadioButton';
import SellingForm from './SellingForm';
import BuyingForm from './BuyingForm';

const CreateListingInformation = ({
  onSubmit,
  options,
  onChangeValue,
  typeHandler,
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  negotiable,
  setNegotiable,
}) => (
  <form className="p-5" onSubmit={onSubmit}>
    {/* Selling/Buying Options */}
    <RadioButton options={options} onChangeValue={onChangeValue} />

    {/* Selling/Buying Form */}
    {typeHandler && typeHandler === 2 && (
      <SellingForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        negotiable={negotiable}
        setNegotiable={setNegotiable}
      />
    )}
    {typeHandler && typeHandler === 1 && (
      <BuyingForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        negotiable={negotiable}
        setNegotiable={setNegotiable}
      />
    )}

    {/* List Now Submit Btn */}
    {typeHandler && (
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
);

CreateListingInformation.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  typeHandler: PropTypes.number,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  setPrice: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  negotiable: PropTypes.bool.isRequired,
  setNegotiable: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateListingInformation;
