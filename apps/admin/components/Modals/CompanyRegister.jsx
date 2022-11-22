import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import BaseModal from './BaseModal';
import FormError from '../Forms/FormError';
import FormInput from '../Forms/FormTextInput';
import FormInputGroup from '../Forms/FormInputGroup';

/**
 * Company creation modal
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns
 */
const CompanyRegister = ({ isOpen, onRequestClose }) => {
  // Initialise react hook forms
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  // -- Handler Functions --//
  // Handles form submission
  const onSubmit = (data) => {
    // Deconstruct values from data
    const { companyName, companyWebsite, companyComment, companyLogo } = data;

    // Create company in Supabase
    console.log({ data });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      header={
        <div>
          <h3 className="text-lg font-bold">Create an individual company</h3>
          <p className="text-sm">Register a company profile to the system</p>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <div className="flex-1 md:mr-10">
            <div className="flex flex-col">
              {/* Company name input field */}
              <FormInputGroup
                label="Company name"
                name="companyName"
                register={register}
                error={errors.companyName}
                required
              />
              {/* Company website input field */}
              <FormInputGroup
                label="Company website"
                name="companyWebsite"
                register={register}
                error={errors.companyWebsite}
                required
                customValidation={{
                  // Regexp for validating urls taken from https://regexr.com/39nr7
                  pattern: {
                    value:
                      /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi,
                    message: 'Company website must be a valid URL',
                  },
                }}
              />
              {/* Company comments input field */}
              <FormInputGroup
                type="textarea"
                label="Company comment"
                name="companyComment"
                register={register}
                error={errors.companyComment}
                placeholder="Add a comment (only visible to you)"
                hideError
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Company logo upload input */}
            <FormInputGroup
              className="flex-1"
              onError={setError}
              onValid={clearErrors}
              type="fileupload"
              label="Company Logo"
              name="companyLogo"
              register={register}
              error={errors.companyLogo}
            />
            <div className="modal-action">
              <button className="btn btn-outline btn-primary w-full">Register Company</button>
            </div>
          </div>
        </div>
        {/* Display any errors pertaining to the company comments
         * We display it here instead of within the input group so that the submit button aligns with the bottom of the company comment input
         */}
        <div className="flex-1 md:w-1/2 md:pr-10">
          <FormError error={errors.companyComment} className="mb-0 pb-0" />
        </div>
      </form>
    </BaseModal>
  );
};

CompanyRegister.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

export default CompanyRegister;
