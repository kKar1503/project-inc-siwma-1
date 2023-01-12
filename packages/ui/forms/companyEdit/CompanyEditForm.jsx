import Link from 'next/link';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormImageInput, FormInputGroup, FormTextArea, FormTextInput } from '../index';

const CompanyEditForm = ({ onSubmit, submitSuccess, isLoading, onDeleteImage, backButton, disableAdmin }) => (
  <form className='flex flex-col flex-1' onSubmit={onSubmit}>
    <div className="flex flex-1 flex-wrap gap-8 p-8">
      <div className="flex flex-col lg:flex-[3] flex-wrap">
        <div className="flex flex-1">
          <FormInputGroup
            className="flex-1"
            label="Company Logo"
            name="companyLogo"
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
            <div className="flex gap-4 justify-between">
              <FormInputGroup
                className="flex-1"
                label="Company Name"
                name="companyName"
                isLoading={isLoading}
                success={submitSuccess}
                required
              >
                <FormTextInput />
              </FormInputGroup>
              <FormInputGroup
                className="flex-1"
                label="Website"
                name="companyWebsite"
                isLoading={isLoading}
                success={submitSuccess}
              >
                <FormTextInput
                  customValidation={{
                    // Regexp for validating urls taken from https://regexr.com/39nr7
                    pattern: {
                      value:
                        /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi,
                      message: 'Company website must be a valid URL',
                    },
                  }}
                />
              </FormInputGroup>
            </div>
            <FormInputGroup
              label="Company Bio"
              name="companyBio"
              isLoading={isLoading}
              success={submitSuccess}
              className="flex-1"

            >
              <FormTextArea maxLength={999} className="flex-1" />
            </FormInputGroup>
            {
              // Hide the input field for company comments if admin mode is disabled
              !disableAdmin &&
              <FormInputGroup
                label="Comments"
                name="companyComments"
                isLoading={isLoading}
                success={submitSuccess}
                className="flex-1"
              >
                <FormTextArea />
              </FormInputGroup>
            }
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between">
      <div className="flex">
        <div className="flex px-8 pb-8">
          {
            backButton ||
            (
              <Link href="./companies" className="btn btn-primary">
                Return To Companies
              </Link>
            )
          }
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
        <button type="submit" className="btn btn-success text-base-100">
          Save Changes
        </button>
      </div>
    </div>
  </form>
);

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onDeleteImage: PropTypes.func.isRequired,
  backButton: PropTypes.element,
  disableAdmin: PropTypes.bool
};

CompanyEditForm.propTypes = propTypes;

export default CompanyEditForm;