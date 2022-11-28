import PropTypes from 'prop-types';

import RadioButton from '../RadioButton';
import SellingForm from './SellingForm';
import BuyingForm from './BuyingForm';

const CreateListingInformation = ({ options, onChangeValue, typeHandler }) => (
  <>
    <div className="alert alert-warning shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>All fields need to be filled in!</span>
      </div>
    </div>
    <form className="p-5">
      {/* Selling/Buying Options */}
      <RadioButton options={options} onChangeValue={onChangeValue} />

      {/* Selling/Buying Form */}
      {typeHandler && typeHandler === 'Selling' && <SellingForm />}
      {typeHandler && typeHandler === 'Buying' && <BuyingForm />}

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
  </>
);

CreateListingInformation.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  typeHandler: PropTypes.string,
};

export default CreateListingInformation;
