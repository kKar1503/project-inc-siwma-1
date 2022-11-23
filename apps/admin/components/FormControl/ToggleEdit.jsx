import { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleEdit = ({ value, label }) => {
  const [initialValue, setInitialValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [field, setField] = useState(value);

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
              }
            }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </span>
      </div>
      <div className="form-control">
        <div className="input-group">
          <input
            className="input input-bordered w-full"
            value={field}
            onChange={(e) => setField(e.target.value)}
            disabled={!isEditing}
          />
          {isEditing && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsEditing(!isEditing);
                setInitialValue(field);

                // ADD API CALL HERE (UPDATES FIELD TO DB)
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ToggleEdit.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

export default ToggleEdit;
