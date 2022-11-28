import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import CompanyRegisterForm from './CompanyRegisterForm';

/**
 * Context and logic for the company registration form
 * @param {boolean} submitSuccess Whether or not the form has been submitted successfully
 * @param {()} onSuccessChange The function to invoke when the success state of the form changes
 * @returns A company registration form with processing and handling logic
 */
const CompanyRegisterFormContext = ({ submitSuccess, onSuccessChange }) => {
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
    onSuccessChange(true);
  };

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && Object.keys(dirtyFields).length > 0) {
      // There is at least 1 dirty input, clear the success status of the form
      onSuccessChange(false);
    }
  }, [watchAllFields]);

  return (
    <FormProvider {...formHook}>
      <CompanyRegisterForm onSubmit={handleSubmit(onSubmit)} submitSuccess={submitSuccess} />
    </FormProvider>
  );
};

const propTypes = {
  submitSuccess: PropTypes.bool.isRequired,
  onSuccessChange: PropTypes.func.isRequired,
};

CompanyRegisterFormContext.propTypes = propTypes;

export default CompanyRegisterFormContext;
