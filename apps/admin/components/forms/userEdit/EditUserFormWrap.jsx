import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import { Alert } from '@inc/ui';
import { createServiceSupabaseClient } from '@inc/utils';
import EditUserForm from './EditUserForm';

function parseUserData(data) {
  return {
    id: data.id,
    fullname: data.fullname,
    email: data.email,
    phone: data.phone,
    company: data.companies && data.companies.length > 0 ? data.companies[0].name : '',
    profilePic:
      'https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
    comment:
      data.users_comments && data.users_comments.length > 0 ? data.users_comments[0].comments : '',
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
  const serviceSupabase = createServiceSupabaseClient();

  const formHook = useForm();

  console.log(userQueryData);

  // Parse query data
  const user =
    isLoading || !userQueryData || !userQueryData.data
      ? false
      : parseUserData(userQueryData.data[0]);

  const companies =
    isLoading || !companiesQueryData || !companiesQueryData.data ? [] : companiesQueryData.data;

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
  const onSubmit = async (data) => {
    const { fullname, email, phone, company, password, confirmPassword, comment } = data;
    console.log({ data });

    await supabase
      .from('users')
      .update({
        fullname,
        email,
        phone,
        company,
      })
      .eq('id', user.id);

    if (password !== null && password !== '') {
      if (password === confirmPassword) {
        const isAdmin = await supabase.rpc('is_sysadmin').execute();
        if (isAdmin) {
          await serviceSupabase.auth.admin.updateUserById(user.id, { password });
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
      // There isn't an existing comment for the company, create a new record
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
      redirectTo: 'http://localhost:3001.com/forget-password',
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
