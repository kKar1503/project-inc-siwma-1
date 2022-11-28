import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import cx from 'classnames';
import CompanyEditForm from './CompanyEditForm';

/**
 * Maps default values into a usable format
 * @param {{name: string, image: string, website: string, bio: string, comments: string}} data The data to parse into default values
 * @returns A default value object for react-hook-form
 */
const parseDefaultValues = (data) => ({
  companyName: data.name,
  companyLogo: data.image
    ? {
        src: data.image,
      }
    : null,
  companyWebsite: data.website,
  companyBio: data.bio,
  companyComments: data.comments ? data.comments.comments : '',
});

const CompanyEditFormContext = ({
  defaultValues,
  submitSuccess,
  onSuccessChange,
  isLoading,
  className,
  style,
}) => {
  // -- Initialise libraries -- //
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // -- Retrieve company info from supabase -- //

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

  // Reset the default values of the input when the defaultValues provided changes
  useEffect(() => {
    reset({ ...parseDefaultValues(defaultValues) });
  }, [defaultValues]);

  return (
    <FormProvider {...formHook}>
      <div className={cx('flex flex-1 flex-col justify-between', className)} style={style}>
        <CompanyEditForm
          onSubmit={handleSubmit(onSubmit)}
          submitSuccess={submitSuccess}
          isLoading={isLoading}
        />
        <div className="flex justify-between">
          <div className="flex px-8 pb-8">
            <a href="./companies" className="btn btn-primary">
              Return To Companies
            </a>
          </div>
          <div className="flex px-8 pb-8">
            <a href="./companies" className="btn btn-success text-base-100">
              Save changes
            </a>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

const propTypes = {
  defaultValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    website: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    comments: PropTypes.string,
  }),
  submitSuccess: PropTypes.bool.isRequired,
  onSuccessChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CompanyEditFormContext.propTypes = propTypes;

export default CompanyEditFormContext;
