import { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleEditArea = ({ value, label, maxLength }) => {
  const [initialValue, setInitialValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [field, setField] = useState(value);

  return (
    <div className="flex flex-col flex-1 flex-wrap w-full">
      <div className="label pointer-events-none flex">
        <span className="label-text">
          {label}
          <button
            className="btn btn-active btn-link pointer-events-auto ml-2 px-2"
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) {
                setField(initialValue);
              }
            }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              className="btn btn-active btn-link pointer-events-auto ml-1 px-2"
              onClick={() => {
                setIsEditing(!isEditing);
                setInitialValue(field);
                // ADD API CALL HERE (UPDATES FIELD TO DB)
              }}
            >
              SAVE
            </button>
          )}
        </span>
      </div>
      <div className="form-control">
        <div className="input-group">
          <textarea
            className="rounded-none textarea textarea-bordered w-full"
            maxLength={maxLength}
            value={field}
            onChange={(e) => setField(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

ToggleEditArea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
};

export default ToggleEditArea;
