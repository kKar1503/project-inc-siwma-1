import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import { Alert } from '@inc/ui';
import CompanyEditForm from './CompanyEditForm';

/**
 * Maps default values into a usable format
 * @param {{name: string, image: string, website: string, bio: string, comments: string}} data The data to parse into default values
 * @returns A default value object for react-hook-form
 */
const parseQueryData = (data) => ({
  id: data.id,
  companyName: data.name,
  companyLogo: data.image
    ? {
        src: `https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/company-image-bucket/${data.image}`,
      }
    : null,
  companyWebsite: data.website,
  companyBio: data.bio,
  companyComments:
    data.companies_comments && data.companies_comments.length > 0
      ? data.companies_comments[0].comments
      : '',
});

const CompanyEditFormContext = ({ queryData, onSuccessChange, isLoading, className, style }) => {
  // -- States --//
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // -- Initialise libraries -- //
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // Initialise react hook forms
  const formHook = useForm();

  // Parse query data
  const company =
    isLoading || !queryData || !queryData.data ? false : parseQueryData(queryData.data[0]);

  console.log({ company, submitSuccess });

  // Deconstruct the individual hooks from the object
  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty, dirtyFields, touchedFields },
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
    const { companyName, companyWebsite, companyBio, companyComments, companyLogo } = data;
    console.log({ data });

    // -- Create company in Supabase -- /ord
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
    if (company.companyComments) {
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
    if (companyLogo !== company.companyLogo) {
      // The company logo input changed, update it
      // Check if a image was selected
      if (companyLogo && companyLogo.src !== company.companyLogo.src) {
        // Upload the company logo to the bucket
        await supabase.storage.from('company-image-bucket').upload(companyLogo.name, companyLogo);

        // Update the image column in the companies table
        await supabase.from('companies').update({ image: companyLogo.name }).eq('id', company.id);
        // Check if the image was removed
      } else if (!companyLogo || (companyLogo.src == null && company.companyLogo == null)) {
        // A image was not selected, clear the image column in the companies table
        await supabase.from('companies').update({ image: null }).eq('id', company.id);
      }
    }

    // Success, reset the default value of the inputs and show success message
    setSubmitSuccess(true);
    onSuccessChange();
    console.log('aaa');
  };

  /**
   * Should be invoked when the "Delete Image" button on the company edit form is triggered
   */
  const handleDeleteImage = () => {
    // Clear the image input
    setValue('companyLogo', null);
  };

  // Reset the default values of the input when the queryData provided changes
  useEffect(() => {
    if (!isLoading && !submitSuccess) {
      console.log('feagwregw');
      reset(
        { ...company },
        { keepValues: Object.keys(touchedFields).length > 0, keepTouched: submitSuccess }
      );
    }
  }, [queryData]);

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && isDirty && Object.keys(touchedFields).length > 0) {
      // There is at least 1 dirty input, clear the success status of the form
      setSubmitSuccess(false);
    }
  }, [watchAllFields]);

  useEffect(() => {
    console.log('render');
  });

  return (
    <FormProvider {...formHook}>
      <div className={cx('flex flex-col justify-between flex-1', className)} style={style}>
        <CompanyEditForm
          onSubmit={handleSubmit(onSubmit)}
          submitSuccess={false}
          isLoading={isLoading}
          onDeleteImage={handleDeleteImage}
        />
        <div className={cx('my-12 transition lg:w-7/12 mx-auto', { hidden: !false })}>
          <Alert
            level="success"
            message="Company created successfully"
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
  queryData: PropTypes.shape({
    data: {
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
    },
  }),
  onSuccessChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CompanyEditFormContext.propTypes = propTypes;

export default CompanyEditFormContext;
