import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Alert, FormError, FormInputGroup } from '@inc/ui';
import BaseModal from './BaseModal';

/**
 * Company creation modal
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns
 */
const CompanyRegister = ({ isOpen, onRequestClose, onSuccess }) => {
  // -- Component states -- //
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // -- Initialise libraries -- //
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // Initialise react hook forms
  const formHook = useForm();

  // Deconstruct the individual hooks from the object
  const {
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields },
  } = formHook;

  // Watch all input fields
  const watchAllFields = watch();

  // -- Handler Functions -- //
  /**
   * Handles form submission
   * @param {{}} data Form data
   */
  const onSubmit = async (data) => {
    // Reset form submission status
    setSubmitSuccess(false);

    // Deconstruct values from data
    const { companyName, companyWebsite, companyComment, companyLogo } = data;

    // -- Create company in Supabase -- //
    // Create company record and return it
    const { data: companyData } = await supabase
      .from('companies')
      .insert([
        {
          name: companyName,
          website: companyWebsite,
        },
      ])
      .select();

    // Create a record in companies_comments if a comment was given
    if (companyComment) {
      // Create a comment for the company
      await supabase.from('companies_comments').insert([
        {
          companyid: companyData[0].id,
          comments: companyComment,
        },
      ]);
    }

    // Upload the company logo if provided
    if (companyLogo) {
      // Upload company logo
      await supabase.storage.from('companyprofilepictures').upload(companyLogo.name, companyLogo);

      // Update the newly created company record with the name of the logo uploaded
      await supabase
        .from('companies')
        .update({ image: companyLogo.name })
        .eq('id', companyData[0].id);
    }

    // Success, clear inputs and show success message
    reset();
    setSubmitSuccess(true);

    // Invoke the onSuccess handler if provided
    if (onSuccess) {
      onSuccess();
    }
  };

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && Object.keys(dirtyFields).length > 0) {
      // There is at least 1 dirty input, clear the success status of the form
      setSubmitSuccess(false);
    }
  }, [watchAllFields]);

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
      siblings={
        // TODO: Make the alert fade in and out
        // Can only be done using either opacity or visibility css properties, but those properties do not remove the alert from the DOM
        // Using the hidden class alongside any of those properties negate them
        // So the transition can only be achieved either by Javascript with setTimeouts, or maybe Framer Motion
        <div className={cx('w-full transition', { hidden: !submitSuccess })}>
          <Alert
            level="success"
            message="Company created successfully"
            className="text-white lg:w-1/3 absolute shadow-lg translate-x-1/2 right-[50%] mt-5"
            onRequestClose={() => setSubmitSuccess(false)}
            dismissable
          />
        </div>
      }
    >
      <FormProvider {...formHook}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap">
            <div className="flex-1 md:mr-10">
              <div className="flex flex-col">
                {/* Company name input field */}
                <FormInputGroup
                  label="Company name"
                  name="companyName"
                  success={submitSuccess}
                  required
                />
                {/* Company website input field */}
                <FormInputGroup
                  label="Company website"
                  name="companyWebsite"
                  customValidation={{
                    // Regexp for validating urls taken from https://regexr.com/39nr7
                    pattern: {
                      value:
                        /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi,
                      message: 'Company website must be a valid URL',
                    },
                  }}
                  success={submitSuccess}
                />
                {/* Company comments input field */}
                <FormInputGroup
                  type="textarea"
                  label="Company comment"
                  name="companyComment"
                  placeholder="Add a comment (only visible to you)"
                  success={submitSuccess}
                  hideError
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              {/* Company logo upload input */}
              <FormInputGroup
                className="flex-1"
                type="imageUpload"
                label="Company Logo"
                name="companyLogo"
                success={submitSuccess}
                allowedExts={{
                  name: ['png', 'jpg', 'jpeg', 'svg'],
                  format: ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'],
                }}
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
            <FormError inputName="companyComment" className="mb-0 pb-0" />
          </div>
        </form>
      </FormProvider>
    </BaseModal>
  );
};

CompanyRegister.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default CompanyRegister;
