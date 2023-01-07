import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import CategoryAddForm from './CategoryAddForm';

/**
 * Context and logic for the company registration form
 * @param {boolean} submitSuccess Whether or not the form has been submitted successfully
 * @param {()} onSuccessChange The function to invoke when the success state of the form changes
 * @returns A company registration form with processing and handling logic
 */
const CategoryAddFormContext = ({ submitSuccess, onSuccessChange }) => {
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
    const { categoryName, categoryDescription, categoryImage } = data;

    // -- Create company in Supabase -- //
    // Create company record and return it
    const { data: categoryData } = await supabase
      .from('category')
      .insert([
        {
          name: categoryName,
          description: categoryDescription,
        },
      ])
      .select();

    // Upload the category image if provided
    if (categoryImage) {
      // Upload category image
      await supabase.storage.from('company-image-bucket').upload(categoryImage.name, categoryImage);

      // Update the newly created category with the name of the image uploaded
      await supabase
        .from('category')
        .update({ image: categoryImage.name })
        .eq('id', categoryData[0].id);
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
      <CategoryAddForm onSubmit={handleSubmit(onSubmit)} submitSuccess={submitSuccess} />
    </FormProvider>
  );
};

const propTypes = {
  submitSuccess: PropTypes.bool.isRequired,
  onSuccessChange: PropTypes.func.isRequired,
};

CategoryAddFormContext.propTypes = propTypes;

export default CategoryAddFormContext;
