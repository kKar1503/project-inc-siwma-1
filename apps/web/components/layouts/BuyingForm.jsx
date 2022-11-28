import React from 'react';
import Input from '../Input';

const BuyingForm = () => (
  <>
    {/* Title Label */}
    <Input text="Buying Title" />

    {/* Price Label */}
    <Input text="Price (SGD)" />
    <div className="form-control w-1/6 flex flex-row justify-start">
      <label className="label cursor-pointer space-x-4">
        <span className="label-text">Negotiable</span>
        <input type="checkbox" className="checkbox checkbox-primary" />
      </label>
    </div>

    {/* Quantity Label */}
    <Input text="Quantity" />

    {/* Description Label */}
    <Input text="Description" type="textarea" />
  </>
);

export default BuyingForm;
