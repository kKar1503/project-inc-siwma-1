import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const BuyingForm = ({
  name,
  setName,

  price,
  setPrice,

  description,
  setDescription,

  negotiable,
  setNegotiable,
}) => (
  <>
    {/* Title Label */}
    <Input text="Buying Title" value={name} onChange={(e) => setName(e.target.value)} />

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
);

BuyingForm.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,

  price: PropTypes.string.isRequired,
  setPrice: PropTypes.func.isRequired,

  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,

  negotiable: PropTypes.bool.isRequired,
  setNegotiable: PropTypes.func.isRequired,
};

export default BuyingForm;