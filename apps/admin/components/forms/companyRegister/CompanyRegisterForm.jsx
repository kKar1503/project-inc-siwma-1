import { FormError, FormImageInput, FormInputGroup, FormTextArea, FormTextInput } from '@inc/ui';
import PropTypes from 'prop-types';

/**
 * Layout for the company registration form
 * @param {()} onSubmit The function to invoke on form submission
 * @param {boolean} submitSuccess Whether or not the form submission is successful
 * @returns The company registration form
 */
const CompanyRegisterForm = ({ onSubmit, submitSuccess }) => (
  <form onSubmit={onSubmit}>
    <div className="flex flex-wrap">
      <div className="flex-1 md:mr-10">
        <div className="flex flex-col">
          {/* Company name input field */}
          <FormInputGroup label="Company name" name="companyName" success={submitSuccess} required>
            <FormTextInput />
          </FormInputGroup>
          {/* Company website input field */}
          <FormInputGroup label="Company website" name="companyWebsite" success={submitSuccess}>
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
          {/* Company comments input field */}
          <FormInputGroup
            label="Company comment"
            name="companyComment"
            success={submitSuccess}
            hideError
          >
            <FormTextArea placeholder="Add a comment (only visible to you)" />
          </FormInputGroup>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Company logo upload input */}
        <FormInputGroup
          className="flex-1"
          label="Company Logo"
          name="companyLogo"
          success={submitSuccess}
        >
          <FormImageInput
            allowedExts={{
              name: ['png', 'jpg', 'jpeg', 'svg'],
              format: ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'],
            }}
          />
        </FormInputGroup>
        <div className="modal-action">
          <button className="btn btn-outline btn-primary w-full">Register Company</button>
        </div>
      </div>
    </div>
    {/* Display any errors pertaining to the company comments
     * We display it here instead of within the input group so that the submit button aligns with the bottom of the company comment input
     */}
    <div className="flex-1 md:w-1/2 md:pr-10">
      <FormError inputName="companyComment" className="mb-0 pb-0" />
    </div>
  </form>
);

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
};

CompanyRegisterForm.propTypes = propTypes;

export default CompanyRegisterForm;