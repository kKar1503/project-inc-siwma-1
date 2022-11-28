import { FormImageInput, FormInputGroup, FormTextArea, FormTextInput } from '@inc/ui';
import PropTypes from 'prop-types';

const CompanyEditForm = ({ isLoading }) => (
  <div className="flex flex-wrap gap-8 p-8">
    <div className="flex flex-col lg:flex-[3] flex-wrap">
      <div className="flex flex-1">
        <FormInputGroup className="flex-1" label="Company Logo" name="companyLogo">
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
      <button className="btn btn-outline btn-error hover:text-base-100">Delete Image</button>
    </div>
    <div className="flex-[9] flex-wrap">
      <div className="flex flex-col w-full min-w-96 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <FormInputGroup
              className="flex-1"
              label="Company Name"
              name="companyName"
              isLoading={isLoading}
              required
            >
              <FormTextInput />
            </FormInputGroup>
            <FormInputGroup
              className="flex-1"
              label="Website"
              name="companyWebsite"
              isLoading={isLoading}
              customValidation={{
                // Regexp for validating urls taken from https://regexr.com/39nr7
                pattern: {
                  value:
                    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi,
                  message: 'Company website must be a valid URL',
                },
              }}
            >
              <FormTextInput />
            </FormInputGroup>
          </div>
          <FormInputGroup label="Company Bio" name="companyBio" isLoading={isLoading}>
            <FormTextArea />
          </FormInputGroup>
          <FormInputGroup label="Comments" name="companyComments" isLoading={isLoading}>
            <FormTextArea />
          </FormInputGroup>
        </div>
      </div>
    </div>
  </div>
);

const propTypes = {
  isLoading: PropTypes.bool,
};

CompanyEditForm.propTypes = propTypes;

export default CompanyEditForm;
