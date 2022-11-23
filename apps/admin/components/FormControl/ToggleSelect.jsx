import { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleSelect = ({ value, options, label }) => {
  const [initialValue, setInitialValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [field, setField] = useState(value);

  // currently the component uses NAME MATCHING to derive the selected value
  // when this is being hooked up to supabase, you may try to use the company ID instead
  // as of now, the company

  return (
    <div className="flex flex-col flex-1 flex-wrap">
      <div className="label pointer-events-none flex">
        <span className="label-text">
          {label}
          <button
            className="btn btn-active btn-link pointer-events-auto"
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) {
                setField(initialValue);
                console.log(initialValue);
              }
            }}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </span>
      </div>
      <div className="form-control w-full">
        <div className="input-group">
          <select className="font-semibold select select-bordered grow" disabled={!isEditing}>
            {options.map((option) => (
              <option value={field} selected={field === option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

ToggleSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
};

export default ToggleSelect;
