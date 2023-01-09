import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import { Alert } from '@inc/ui';
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
}) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    watch,
    setValue,
    formState: { isDirty, dirtyFields, touchedFields },
  } = formHook;

  const watchAllFields = watch();

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

    await supabase
      .from('users')
      .update({
        fullname,
        email,
        phone,
        companyid,
        bio,
      })
      .eq('id', user.id);

    if (newPassword !== null && newPassword !== '') {
      if (newPassword === confirmPassword) {
        const { data: logindata } = await supabase.auth.getUser();
        const isAdmin = await supabase.rpc(`is_sysadmin`, { userid: logindata.user.id });
        if (isAdmin) {
          const response = await fetch(`/api/auth/changePassword?userid=${user.id}`, {
            method: 'POST',
            body: JSON.stringify({
              password: newPassword,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            // password error
          }
        }
      }
    }

    if (user.comment) {
      await supabase
        .from('users_comments')
        .update({
          comments: comment,
        })
        .eq('userid', user.id);
    } else {
      await supabase.from('users_comments').insert([
        {
          userid: user.id,
          comments: comment,
        },
      ]);
    }

    setSubmitSuccess(true);
    onSuccessChange();
  };

  const sendEmail = async () =>
    supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: 'http://localhost:3001/forget-password',
    });

  const handleDeleteImage = () => {
    setValue('companyLogo', null);
  };

  useEffect(() => {
    if (!isLoading && !submitSuccess) {
      reset(
        { ...user },
        { keepValues: Object.keys(touchedFields).length > 0, keepTouched: submitSuccess }
      );
    }
  }, [userQueryData]);

  useEffect(() => {
    if (submitSuccess && isDirty && Object.keys(touchedFields).length > 0) {
      setSubmitSuccess(false);
    }
  }, [watchAllFields]);

  return (
    <FormProvider {...formHook}>
      <div className={cx('flex flex-col justify-between flex-1', className)} style={style}>
        <EditUserForm
          onSubmit={handleSubmit(onSubmit)}
          submitSuccess={false}
          isLoading={isLoading}
          onDeleteImage={handleDeleteImage}
          options={companies}
          sendEmail={sendEmail}
        />
        <div className={cx('my-12 transition lg:w-7/12 mx-auto', { hidden: !false })}>
          <Alert
            level="success"
            message="User edited successfully"
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
  userQueryData: PropTypes.shape({
    data: {
      id: PropTypes.number.isRequired,
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      enabled: PropTypes.number.isRequired,
      companyid: PropTypes.number.isRequired,
      companies: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      bio: PropTypes.string.isRequired,
      users_comments: PropTypes.shape({
        userid: PropTypes.number.isRequired,
        comments: PropTypes.string.isRequired,
      }),
    },
  }),
  companiesQueryData: PropTypes.shape({
    data: {
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    },
  }),
  onSuccessChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

EditUserFormWrap.propTypes = propTypes;

export default EditUserFormWrap;
