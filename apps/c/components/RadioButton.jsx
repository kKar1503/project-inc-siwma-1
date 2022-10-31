/* eslint-disable arrow-body-style */
import React from 'react';

const RadioButton = () => {
  const [choice, setChoice] = React.useState('');

  const onChange = async (event) => {
    setChoice(event.target.value);
  };

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Red pill</span>
          <input
            type="radio"
            name="radio-10"
            value="Buy"
            className="radio checked:bg-red-500"
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Blue pill</span>
          <input
            type="radio"
            name="radio-10"
            value="Sell"
            className="radio checked:bg-blue-500"
            onChange={onChange}
          />
        </label>
      </div>
      {choice}
    </>
  );
};
export default RadioButton;
