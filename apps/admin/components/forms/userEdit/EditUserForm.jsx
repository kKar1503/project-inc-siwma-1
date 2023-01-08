import PropTypes from 'prop-types';
import {
  FormImageInput,
  FormInputGroup,
  FormTextArea,
  FormTextInput,
  FormSelectInput,
} from '@inc/ui';

const EditUserForm = ({
  onSubmit,
  submitSuccess,
  isLoading,
  onDeleteImage,
  options,
  sendEmail,
}) => (
  <form onSubmit={onSubmit}>
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col flex-[3] flex-wrap">
        <div className="flex flex-col justify-center items-center">
          <FormInputGroup
            className="flex-1"
            label="Profile Picture"
            name="profilePic"
            isLoading={isLoading}
            success={submitSuccess}
          >
            <FormImageInput
              allowedExts={{
                name: ['png', 'jpg', 'jpeg', 'svg'],
                format: ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'],
              }}
              imageProps={{
                className: 'w-64 h-64',
              }}
            />
          </FormInputGroup>
        </div>
      </div>

      <div className="flex-[9] flex-wrap">
        <div className="flex flex-col w-full min-w-96 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <FormInputGroup
                className="flex-1"
                label="Companies"
                name="company"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                <FormSelectInput options={options} />
              </FormInputGroup>
              <FormInputGroup
                className="flex-1 align-middle"
                label="Fullname"
                name="fullname"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                <FormTextInput />
              </FormInputGroup>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <FormInputGroup
                className="flex-1"
                label="E-mail"
                name="email"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                <FormTextInput />
              </FormInputGroup>
              <FormInputGroup
                className="flex-1"
                label="Mobile Number"
                name="phone"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                <FormTextInput />
              </FormInputGroup>
            </div>
            <div className="flex flex-col">
              <div className="label justify-start -mb-5">
                <span className="label-text">Change Password</span>
                <button
                  className="btn btn-active btn-link pointer-events-auto ml-1 px-2"
                  onClick={sendEmail}
                >
                  SEND E-MAIL
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <FormInputGroup
                  className="flex-1"
                  name="password"
                  noLabel
                  isLoading={isLoading}
                  success={submitSuccess}
                >
                  <FormTextInput placeholder="Password" />
                </FormInputGroup>
                <FormInputGroup
                  className="flex-1"
                  name="confirmPassword"
                  noLabel
                  isLoading={isLoading}
                  success={submitSuccess}
                >
                  <FormTextInput placeholder="Confirm Password" />
                </FormInputGroup>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <FormInputGroup
                label="Comment"
                name="comment"
                isLoading={isLoading}
                success={submitSuccess}
              >
                <FormTextArea />
              </FormInputGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex px-8 pb-8 justify-end">
      <button type="submit" className="btn btn-success mr-8">
        Save
      </button>
      <a href="./users" className="btn btn-primary">
        Return To Users
      </a>
    </div>
  </form>
);

EditUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onDeleteImage: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
  sendEmail: PropTypes.func.isRequired,
};

export default EditUserForm;
