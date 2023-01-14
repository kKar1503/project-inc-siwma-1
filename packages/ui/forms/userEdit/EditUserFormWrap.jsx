import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import Alert from '../../alerts/Alert';
import EditUserForm from './EditUserForm';

function parseUserData(data) {
  return {
    id: data.id,
    fullname: data.fullname,
    bio: data.bio,
    email: data.email,
    phone: data.phone,
    company: data.companies ? data.companies.name : '',
    companyid: data.companyid,
    comment:
      data.users_comments && data.users_comments.length > 0 ? data.users_comments[0].comments : '',
    image: data.image,
    profilePic:
      (data.image && {
        src: `https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/user-image-bucket/${data.image}`,
      }) ||
      null,
  };
}

const EditUserFormWrap = ({
  userQueryData,
  companiesQueryData,
  onSuccessChange,
  isLoading,
  className,
  style,
  path,
  adminContent,
}) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailure, setSubmitFailure] = useState(false);

  const errors = [];

  const supabase = useSupabaseClient();

  const formHook = useForm();

  const user =
    isLoading || !userQueryData || !userQueryData.data
      ? false
      : parseUserData(userQueryData.data[0]);

  const companies =
    isLoading || !companiesQueryData || !companiesQueryData.data ? [] : companiesQueryData.data;

  const {
    handleSubmit,
    reset,
    resetField,
    setValue,
    setError,
    formState: { isDirty, touchedFields },
  } = formHook;

  const onSubmit = async (data) => {
    const {
      fullname,
      email,
      phone,
      companyid,
      bio,
      newPassword,
      confirmPassword,
      comment,
      profilePic,
    } = data;

    console.log(data);

    // -- Update user password -- //
    // Check if the admin wants to update the user's password
    // We return early on error so that other information does not get updated
    if (newPassword.length > 0) {
      // Check if the confirm password is set
      if (confirmPassword.length > 0) {
        // Check if the confirm password is equal to the new password
        if (newPassword === confirmPassword) {
          // Check if the user is authorised to make the change
          const response = await fetch(`/api/auth/changePassword?userid=${user.id}`, {
            method: 'POST',
            body: JSON.stringify({
              password: newPassword,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Check if the request was successful
          if (!response.ok) {
            // It was not, parse the error message
            const jsonResponse = await response.json();
            const errorMessage = jsonResponse.error;

            // Set errors
            setError('newPassword', {
              message: errorMessage,
            });
            setError('confirmPassword');
            return;
          }

          // Password reset success
          // Reset password inputs
          resetField('newPassword');
          resetField('confirmPassword');
        } else {
          // The confirm password does not match the new password
          setError('confirmPassword', {
            message: 'Confirm password must match the new password'
          }, {
            shouldFocus: true
          });
          return;
        }
      } else {
        // The confirm password input is empty
        setError('confirmPassword', {
          message: 'Confirm password cannot be empty'
        }, {
          shouldFocus: true
        });
        return;
      }
    }

    // -- Update user information -- //
    // Fullname, email, phone, company, bio
    const { error: userError } = await supabase
      .from('users')
      .update({
        fullname,
        email,
        phone,
        companyid,
        bio,
      })
      .eq('id', user.id);

    errors.push(userError);

    // -- Update user comments -- //
    if (adminContent) {
      if (user.comment) {
        const { error: commentError } = await supabase
          .from('users_comments')
          .update({
            comments: comment,
          })
          .eq('userid', user.id);
        errors.push(commentError);
      } else {
        const { error: commentError } = await supabase.from('users_comments').insert([
          {
            userid: user.id,
            comments: comment,
          },
        ]);
        errors.push(commentError);
      }
    }

    // -- Update user image -- //
    if (profilePic !== user.image) {
      if (!profilePic) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ image: null })
          .eq('id', user.id);
        const { error: removeError } = await supabase.storage
          .from('user-image-bucket')
          .remove([user.image]);
        errors.push(updateError, removeError);
      } else {
        const { error: uploadError } = await supabase.storage
          .from('user-image-bucket')
          .upload(profilePic.name, profilePic);
        const { error: updateError } = await supabase
          .from('users')
          .update({ image: profilePic.name })
          .eq('id', user.id);
        errors.push(updateError, uploadError);
        if (user.image) {
          const { error: removeError } = await supabase.storage
            .from('user-image-bucket')
            .remove([user.image]);
          errors.push(removeError);
        }
      }
    }

    // Check if there were any errors
    if (errors.some((e) => e != null)) {
      // There was an error
      setSubmitFailure(true);

      // Error all the input fields
      Object.keys(data).forEach((inputName) => {
        setError(inputName);
      });

      return;
    }

    // Success, reset the default value of the inputs (excluding password inputs) and show success message
    reset({ ...data, newPassword: '', confirmPassword: '' }, { keepValues: true });
    setSubmitSuccess(true);
    onSuccessChange();
  };

  const sendEmail = async () =>
    supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: 'http://localhost:3001/forget-password',
    });

  const handleDeleteImage = () => {
    setValue('profilePic', null);
  };

  useEffect(() => {
    if (!isLoading && !submitSuccess) {
      reset(
        { ...user },
        { keepValues: Object.keys(touchedFields).length > 0, keepTouched: submitSuccess }
      );
    }
  }, [userQueryData, companiesQueryData]);

  useEffect(() => {
    if (submitSuccess && isDirty) {
      setSubmitSuccess(false);
    }
  }, [isDirty]);

  return (
    <FormProvider {...formHook}>
      <div className={cx('flex flex-col justify-between flex-1', className)} style={style}>
        <EditUserForm
          onSubmit={handleSubmit(onSubmit)}
          submitSuccess={submitSuccess}
          isLoading={isLoading}
          onDeleteImage={handleDeleteImage}
          options={companies}
          sendEmail={sendEmail}
          path={path}
          adminContent={adminContent}
        />
        <div className='relative'>
          <div className={cx('absolute bottom-20 left-0 right-0 transition lg:w-7/12 mx-auto', { hidden: !submitSuccess })}>
            <Alert
              level="success"
              message="User edited successfully"
              className="text-white shadow-lg"
              onRequestClose={() => setSubmitSuccess(false)}
              dismissable
            />
          </div>
          <div className={cx('absolute bottom-20 left-0 right-0 transition lg:w-7/12 mx-auto', { hidden: !submitFailure })}>
            <Alert
              level="error"
              message="Something went wrong"
              className="text-white shadow-lg"
              onRequestClose={() => setSubmitFailure(false)}
              dismissable
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

const propTypes = {
  userQueryData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        enabled: PropTypes.number.isRequired,
        companyid: PropTypes.number.isRequired,
        companies: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        bio: PropTypes.string.isRequired,
        users_comments: PropTypes.arrayOf(
          PropTypes.shape({
            userid: PropTypes.string.isRequired,
            comments: PropTypes.string.isRequired,
          }),
        ),
      }),
    ),
  }),
  companiesQueryData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
  onSuccessChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  path: PropTypes.string.isRequired,
  adminContent: PropTypes.bool.isRequired,
};

EditUserFormWrap.propTypes = propTypes;

export default EditUserFormWrap;
