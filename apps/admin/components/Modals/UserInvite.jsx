import { useSupabaseClient } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { getAllCompanies } from '@inc/database';
import { useQuery } from 'react-query';
import cx from 'classnames';
import { Alert } from '@inc/ui';
import { useState } from 'react';
import { UserInviteFormWrap } from '../forms/userInvite';
import BaseModal from './BaseModal';

const UserInvite = ({ isOpen, onRequestClose, onSuccess, submitSuccess, setSubmitSuccess }) => {
  const supabase = useSupabaseClient();
  const [submitError, setSubmitError] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['getCompanies'],
    refetchInterval: 60000,
    queryFn: async () =>
      getAllCompanies({
        supabase,
      }),
  });

  const onSuccessChange = (value, error) => {
    if (value && onSuccess) {
      onSuccess();
      onRequestClose();
    }

    if (error) {
      setSubmitError(error.length > 0 ? error : 'An unexpected error occurred');
    }

    setSubmitSuccess(value);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      header={
        <div>
          <h3 className="text-lg font-bold">Create an individual invite</h3>
          <p className="text-sm">Invite an individual user to the system</p>
        </div>
      }
      siblings={
        <div className={cx('w-full transition', { hidden: !submitError })}>
          <Alert
            level="error"
            message={submitError}
            className="text-white lg:w-1/3 !absolute shadow-lg translate-x-1/2 right-[50%] mt-5"
            onRequestClose={() => setSubmitError(false)}
            dismissable
          />
        </div>
      }
    >
      <UserInviteFormWrap
        isLoading={isLoading}
        companiesQuery={data}
        submitSuccess={submitSuccess}
        onSuccessChange={onSuccessChange}
      />
    </BaseModal>
  );
};

UserInvite.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  setSubmitSuccess: PropTypes.func.isRequired,
};

export default UserInvite;
