import { useState } from 'react';
import PropTypes from 'prop-types';

const TogglePass = ({ alertFunc, sendEmail, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [field, setField] = useState('');
  const [confirmField, setConfirmField] = useState('');

  return (
    <div className="flex flex-col">
      <div className="label justify-start">
        <span className="label-text">Change Password</span>
        <button
          className="btn btn-active btn-link pointer-events-auto ml-2 px-2"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {!isEditing && (
          <button
            className="btn btn-active btn-link pointer-events-auto ml-1 px-2"
            onClick={() => sendEmail()}
          >
            SEND E-MAIL
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col flex-1 flex-wrap">
          <div className="form-control">
            <div className="input-group">
              <input
                className="input input-bordered w-full"
                placeholder="Enter New Password"
                value={field}
                onChange={(e) => setField(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 flex-wrap">
          <div className="form-control">
            <div className="input-group">
              <input
                className="input input-bordered w-full"
                placeholder="Confirm New Password"
                value={confirmField}
                onChange={(e) => setConfirmField(e.target.value)}
                disabled={!isEditing}
              />
              {isEditing && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (field === confirmField) {
                      setIsEditing(!isEditing);
                      setField('');
                      setConfirmField('');
                      // alert('Password Changed');
                      onSave(field);
                      // ADD API CALL HERE (UPDATES FIELD TO DB)
                      // alerts will also probably be changed to a boolean to activate daisyui alert
                      if (alertFunc) {
                        // alert function to be passed here (probably a useState, which will update the alert state in EditUser (the actual page))
                        // success state
                        alertFunc(true);
                      }
                    } else {
                      alert('Passwords do not match');
                      if (alertFunc) {
                        // alert function to be passed here (probably a useState, which will update the alert state in EditUser (the actual page))
                        // error state here
                        alertFunc(true);
                      }
                    }
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TogglePass.propTypes = {
  alertFunc: PropTypes.func,
  sendEmail: PropTypes.func,
  onSave: PropTypes.func,
};

export default TogglePass;
