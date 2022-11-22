import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import BaseModal from './BaseModal';
import FormError from '../Forms/FormError';
import FormInputGroup from '../Forms/FormInputGroup';

/**
 * Company creation modal
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns
 */
const CompanyRegister = ({ isOpen, onRequestClose }) => {
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
    formState: { errors },
  } = formHook;

  // -- Handler Functions -- //
  // Handles form submission
  const onSubmit = async (data) => {
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
    setSubmitSuccess(true);
  };

  // Invokes on successful form submission
  useEffect(() => {
    // Reset form inputs
    if (submitSuccess) reset();
  }, [submitSuccess]);

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
              <FormInputGroup form={formHook} label="Company name" name="companyName" required />
              {/* Company website input field */}
              <FormInputGroup
                form={formHook}
                label="Company website"
                name="companyWebsite"
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
                form={formHook}
                type="textarea"
                label="Company comment"
                name="companyComment"
                placeholder="Add a comment (only visible to you)"
                hideError
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Company logo upload input */}
            <FormInputGroup
              form={formHook}
              className="flex-1"
              type="fileupload"
              label="Company Logo"
              name="companyLogo"
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
