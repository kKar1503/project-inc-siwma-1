import PropTypes from 'prop-types';

import RadioButton from '../RadioButton';
import SellingForm from './SellingForm';
import BuyingForm from './BuyingForm';

const CreateListingInformation = ({ options, onChangeValue, typeHandler }) => (
  <form className="p-5">
    {/* Selling/Buying Options */}
    <RadioButton options={options} onChangeValue={onChangeValue} />

    {/* Selling/Buying Form */}
    {/* eslint-disable no-nested-ternary */}
    {typeHandler ? typeHandler === 'Selling' ? <SellingForm /> : <BuyingForm /> : null}

    {/* List Now Submit Btn */}
    <div className="flex flex-row justify-end">
      <button
        type="submit"
        className="bg-primary hover:bg-primary-focus text-primary-content py-2 px-4 rounded mt-5"
      >
        List Now
      </button>
    </div>
  </form>
);

CreateListingInformation.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  typeHandler: PropTypes.string,
};

export default CreateListingInformation;
