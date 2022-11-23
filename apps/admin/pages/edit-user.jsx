import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Image from 'next/image';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';

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

const TogglePass = ({ alertFunc }) => {
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
            onClick={
              () =>
                // ADD API CALL HERE (SENDS EMAIL TO USER)
                1 // Remove this line, eslint very unhappy that I add a function with no body
            }
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
                      alert('Password Changed');
                      // ADD API CALL HERE (UPDATES FIELD TO DB)
                      // alerts will also probably be changed to a boolean to activate daisyui alert
                      if (alertFunc) {
                        // alert function to be passed here (probably a useState, which will update the alert state in EditUser (the actual page))
                        // success state
                        alertFunc(true);
                      }
                    } else {
                      alert('Passwords do not match');
                      if (false) {
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

const EditUser = () => {
  // SET ALL USER DATA HERE (PROBABLY USE THE API CALL TO GET USER DATA)
  const fullName = 'John Doe';
  const email = 'E-mail';
  const companyName = 'Company';
  const mobileNumber = '9232 3232';
  const profilePic =
    'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg';

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 p-8 overflow-auto xl:max-h-screen">
      <NavBar />

      <div className="flex flex-col grow h-fit shadow-xl rounded-2xl space-between bg-base-100">
        <div className="flex flex-col px-6 pt-6">
          <h1 className="font-bold text-xl">Edit User</h1>
        </div>
        <div className="flex flex-wrap gap-8 p-8">
          <div className="flex flex-col flex-[3] flex-wrap">
            <div className="flex flex-col justify-center items-center">
              <div className="avatar aspect-square w-64 rounded-full bg-none items-center justify-center group">
                <Image
                  src={profilePic}
                  alt="profile"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <input
                  id="fileInput"
                  type="file"
                  onChange={changeHandler}
                  className="hidden"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
                <label
                  htmlFor="fileInput"
                  className="btn btn-ghost w-full h-full rounded-full items-center hidden justify-center group-hover:flex"
                >
                  <span>UPLOAD IMAGE</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex-[9] flex-wrap">
            <div className="flex flex-col w-full min-w-96 gap-12">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <ToggleEdit value={companyName} label="Company" />
                  <ToggleEdit value={fullName} label="Full Name" />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <ToggleEdit value={email} label="E-mail" />
                  <ToggleEdit value={mobileNumber} label="Mobile Number" />
                </div>
                <TogglePass />
                <div className="flex flex-col gap-4">
                  <ToggleEditArea value="Comments" label="Comments" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-8 pb-8 justify-end">
          <button className="btn btn-primary">Return To Users</button>
        </div>
      </div>
    </div>
  );
};

ToggleEdit.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

ToggleEditArea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
};

TogglePass.propTypes = {
  alertFunc: PropTypes.func,
};

EditUser.getLayout = (page) => <AdminPageLayout pageName="Users">{page}</AdminPageLayout>;

export default EditUser;
