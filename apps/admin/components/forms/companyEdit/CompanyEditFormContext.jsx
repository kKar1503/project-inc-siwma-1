import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import { Alert } from '@inc/ui';
import CompanyEditForm from './CompanyEditForm';

/**
 * Maps default values into react-hook-form default values
 * @param {{name: string, image: string, website: string, bio: string, comments: string}} data The data to parse into default values
 * @returns A default value object for react-hook-form
 */
const obtainDefaultValues = (data) => ({
  id: data.id,
  companyName: data.name,
  companyLogo: data.image,
  companyWebsite: data.website,
  companyBio: data.bio,
  companyComments: data.comments,
});

const CompanyEditFormContext = ({ company, onSuccessChange, isLoading, className, style }) => {
  // -- States --//
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
    setValue,
    formState: { isDirty, dirtyFields },
  } = formHook;

  // -- Handler Functions -- //
  /**
   * Handles form submission
   * @param {{}} data Form data
   */
  const onSubmit = async (data) => {
    // Deconstruct values from data
    const { companyName, companyWebsite, companyBio, companyComments, companyLogo } = data;

    // -- Update company in Supabase -- //
    await supabase
      .from('companies')
      .update({
        name: companyName,
        website: companyWebsite,
        bio: companyBio,
      })
      .eq('id', company.id);

    // -- Edit/create a new comment -- //
    // Check if there is an existing comment for the company
    if (company.comments) {
      // There is an existing comment for the company, update it
      await supabase
        .from('companies_comments')
        .update({
          comments: companyComments,
        })
        .eq('companyid', company.id);
    } else {
      // There isn't an existing comment for the company, create a new record
      await supabase.from('companies_comments').insert([
        {
          companyid: company.id,
          comments: companyComments,
        },
      ]);
    }

    // -- Update/create company logo -- //
    // Check if the value of the company logo input changed
    if (Object.keys(dirtyFields).includes('companyLogo')) {
      // The company logo input changed, update it
      // Check if the image was removed
      if (!companyLogo && company.image) {
        // The image was deleted, clear the image column in the companies table
        await supabase.from('companies').update({ image: null }).eq('id', company.id);
        // Check if the image was changed
      } else if ((companyLogo && !company.image) || companyLogo !== company.image.src) {
        // Upload the company logo to the bucket
        await supabase.storage.from('company-image-bucket').upload(companyLogo.name, companyLogo);

        // Update the image column in the companies table
        await supabase.from('companies').update({ image: companyLogo.name }).eq('id', company.id);
      }
    }

    // Success, reset the default value of the inputs and show success message
    reset(data, { keepValues: true });
    setSubmitSuccess(true);
    onSuccessChange();
  };

  /**
   * Should be invoked when the "Delete Image" button on the company edit form is triggered
   */
  const handleDeleteImage = () => {
    // Clear the image input
    setValue('companyLogo', null, { shouldTouch: true, shouldDirty: true });
  };

  // Reset the default values of the input when the queryData provided changes
  useEffect(() => {
    if (!isLoading && !submitSuccess && !isDirty) {
      reset(obtainDefaultValues(company, { keepValues: true }));
    }
  }, [company]);

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && isDirty) {
      // There is at least 1 dirty input, clear the success status of the form
      setSubmitSuccess(false);
    }
  }, [isDirty]);

  return (
    <FormProvider {...formHook}>
      <div className={cx('flex flex-col justify-between flex-1', className)} style={style}>
        <CompanyEditForm
          onSubmit={handleSubmit(onSubmit)}
          submitSuccess={submitSuccess}
          isLoading={isLoading}
          onDeleteImage={handleDeleteImage}
        />
        <div className={cx('my-12 transition lg:w-7/12 mx-auto', { hidden: !submitSuccess })}>
          <Alert
            level="success"
            message="Changes saved successfully"
            className="text-white shadow-lg"
            onRequestClose={() => setSubmitSuccess(false)}
            dismissable
          />
        </div>
      </div>
    </FormProvider>
  );
};

const propTypes = {
  company: PropTypes.oneOfType([
    null,
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.exact({
        src: PropTypes.string.isRequired,
      }),
      website: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      comments: PropTypes.shape({
        companyid: PropTypes.number.isRequired,
        comments: PropTypes.string.isRequired,
      }),
    }),
  ]),
  onSuccessChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CompanyEditFormContext.propTypes = propTypes;

export default CompanyEditFormContext;