import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  FormImageInput,
  FormInputGroup,
  FormTextArea,
  FormTextInput,
  FormSelectInput,
} from '../index';

const EditUserForm = ({
  onSubmit,
  submitSuccess,
  isLoading,
  onDeleteImage,
  options,
  sendEmail,
  path,
  adminContent,
}) => (
  <form className='flex flex-col flex-1' onSubmit={onSubmit}>
    <div className="flex flex-1 flex-wrap gap-8 p-8">
      <div className="flex flex-col flex-[3] flex-wrap">
        <div className="flex flex-1">
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
                className: 'h-[10vw] w-[10vw]',
              }}
            />
          </FormInputGroup>
        </div>
      </div>

      <div className="h-full flex-[9] flex-wrap">
        <div className="flex flex-col h-full w-full min-w-96 gap-12">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col md:flex-row gap-4">
              <FormInputGroup
                className="flex-1"
                label="Companies"
                name="companyid"
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
                <FormTextInput
                  customValidation={{
                    // Regexp for validating emails taken from https://regexr.com/39nr7
                    pattern: {
                      value:
                        /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: 'Email address must be of a valid format',
                    },
                  }}
                />
              </FormInputGroup>
              <FormInputGroup
                className="flex-1"
                label="Mobile Number"
                name="phone"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                <FormTextInput
                  customValidation={{
                    pattern: {
                      value: /^(\+\d{2})?\d+$/,
                      message: 'Phone number must be valid',
                    },
                  }}
                />
              </FormInputGroup>
            </div>

            <FormInputGroup className="flex-1" label="Bio" name="bio" isLoading={isLoading} success={submitSuccess}>
              <FormTextArea maxLength={999} />
            </FormInputGroup>

            <div className="flex flex-col">
              {/* Commented out for now because the password reset via email has yet to be implemented properly */}
              <div className="label justify-start p-0">
                <span className="label-text">Change Password</span>
                <button
                  type='button'
                  className="btn btn-active btn-link pointer-events-auto ml-1 px-2"
                  onClick={sendEmail}
                >
                  SEND E-MAIL
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <FormInputGroup
                  className="flex-1"
                  name="newPassword"
                  label='New Password'
                  isLoading={isLoading}
                  success={submitSuccess}
                >
                  <FormTextInput
                    type='password'
                    placeholder="Password"
                    customValidation={{
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters in length'
                      },
                    }} />
                </FormInputGroup>
                <FormInputGroup
                  className="flex-1"
                  name="confirmPassword"
                  label="Confirm Password"
                  isLoading={isLoading}
                  success={submitSuccess}
                >
                  <FormTextInput type='password' placeholder="Confirm Password" />
                </FormInputGroup>
              </div>
            </div>

            {adminContent ? (
              <FormInputGroup
                label="Comment"
                name="comment"
                isLoading={isLoading}
                success={submitSuccess}
                className="flex-1"
              >
                <FormTextArea />
              </FormInputGroup>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-between">
      <div className="flex">
        <div className="flex px-8 pb-8">
          <Link href={path} className="btn btn-primary">
            Go back
          </Link>
        </div>
        <div className="gap-8 px-8">
          <button
            type="button"
            className="btn btn-outline btn-error hover:text-base-100"
            onClick={onDeleteImage}
          >
            Delete Image
          </button>
        </div>
      </div>
      <div className="flex px-8 pb-8">
        <button type="submit" className="btn btn-success btn-outline hover:text-base-100">
          Save
        </button>
      </div>
    </div>
  </form>
);

EditUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onDeleteImage: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
  sendEmail: PropTypes.func.isRequired,
  path: PropTypes.string,
  adminContent: PropTypes.bool,
};

export default EditUserForm;
