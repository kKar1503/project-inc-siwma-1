import Dropdown from '../Dropdown';
import Input from '../Input';
import RadioButton from '../RadioButton';

const CreateListingInformation = () => (
  <form className="p-5">
    {/* Selling/Buying Options */}
    <div className="flex flex-row justify-between mb-5">
      <button className="bg-primary hover:bg-primary-focus text-primary-content py-2 px-4 rounded w-2/5">
        Selling
      </button>
      <button className="bg-primary hover:bg-primary-focus text-primary-content py-2 px-4 rounded w-2/5">
        Buying
      </button>
    </div>

    {/* Category Label */}
    <Dropdown items={['Bar', 'Angle Bars', 'Big Bricks']} />

    {/* Title Label */}
    <Input text="Title" />

    {/* Condition Label */}
    <RadioButton options={['New', 'Used']} />

    {/* Price Label */}
    <Input text="Price" />
    <div className="form-control w-1/6">
      <label className="label cursor-pointer">
        <span className="label-text">Negotiable</span>
        <input type="checkbox" className="checkbox checkbox-primary" />
      </label>
    </div>

    {/* Description Label */}
    <Input text="Description" type="textarea" />

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

export default CreateListingInformation;
