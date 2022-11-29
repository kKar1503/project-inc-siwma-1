import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const SellingForm = ({
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
    <Input text="Selling Title" value={name} onChange={(e) => setName(e.target.value)} />

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

    {/* Quantity Label */}
    {/* <Input text="Quantity" /> */}

    {/* Description Label */}
    <Input
      text="Description"
      type="textarea"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </>
);

SellingForm.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,

  price: PropTypes.string.isRequired,
  setPrice: PropTypes.func.isRequired,

  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,

  negotiable: PropTypes.bool.isRequired,
  setNegotiable: PropTypes.func.isRequired,
};

export default SellingForm;
