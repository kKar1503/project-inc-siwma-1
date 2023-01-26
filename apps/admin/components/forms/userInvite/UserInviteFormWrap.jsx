import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQueryClient } from 'react-query';
import UserInviteForm from './UserInviteForm';

const UserInviteFormWrap = ({ isLoading, companiesQuery, submitSuccess, onSuccessChange }) => {
  const supabase = useSupabaseClient();
  const formHook = useForm();
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = formHook;

  const watchAllFields = watch();

  const queryClient = useQueryClient();

  const companies = isLoading || !companiesQuery || !companiesQuery.data ? [] : companiesQuery.data;

  const submitHandler = async (data) => {
    const { email, name, companyid } = data;

    const tokenHash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(name + email + Date.now() + Math.random().toString(16).substr(2, 8))
    );

    const token = Array.from(new Uint8Array(tokenHash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const { data: inviteData, error } = await supabase.from('invite')
      .insert({
        name,
        email,
        company: companyid,
        token,
        expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      })
      .select()
      .single();

    if (error) {
      onSuccessChange(false, error);
      return;
    }

    // Invite successfully sent
    fetch(`/api/invite/${inviteData.id}/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((inviteResult) => {
      if (!inviteResult.ok) {
        onSuccessChange(false, `Error sending invite for user: ${inviteData.email}`);
      }
    });

    reset();
    queryClient.invalidateQueries();
    onSuccessChange(true, null);
  };

  useEffect(() => {
    if (submitSuccess && isDirty) {
      onSuccessChange(false, null);
    }
  }, [watchAllFields]);

  return (
    <FormProvider {...formHook}>
      <UserInviteForm
        isLoading={isLoading}
        submitSuccess={submitSuccess}
        onSubmit={handleSubmit(submitHandler)}
        options={companies}
      />
    </FormProvider>
  );
};

UserInviteFormWrap.propTypes = {
  isLoading: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  onSuccessChange: PropTypes.func.isRequired,
  companiesQuery: PropTypes.shape({
    data: {
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    },
  }),
};

export default UserInviteFormWrap;
