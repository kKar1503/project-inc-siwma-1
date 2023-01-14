import { useQueryClient } from 'react-query';
import { useState } from 'react';
import Link from 'next/link';
import { Alert } from '@inc/ui';
import cx from 'classnames';
import NavBar from '../components/NavBar';
import UserInvite from '../components/Modals/UserInvite';
import RegisteredUsersTable from '../components/Tables/RegisteredUsersTable';
import PendingInvitesTable from '../components/Tables/PendingInvitesTable';
import AdminPageLayout from '../components/layouts/AdminPageLayout';

/**
 * Comment to be written
 */
const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const refreshQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    queryClient.invalidateQueries({ queryKey: ['getUserCount'] });
    queryClient.invalidateQueries({ queryKey: ['getInvites'] });
    queryClient.invalidateQueries({ queryKey: ['getInviteCount'] });
  };

  return (
    <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
      <NavBar />

      <div className="flex flex-row gap-6">
        <div className="mb-4 gap-4 flex-1">
          <div className="rounded-xl shadow-lg p-4 bg-base-100">
            <div className="pb-3">
              <h3 className="font-bold text-lg">Create an individual invite</h3>
              <p className="text-sm">Invite an individual user to the system</p>
            </div>
            <button onClick={openModal} className="btn w-full btn-outline btn-primary">
              Send Invite
            </button>
          </div>
        </div>
        <div className="mb-4 gap-4 flex-1">
          <div className="rounded-xl shadow-lg p-4 bg-base-100">
            <div className="pb-3">
              <h3 className="font-bold text-lg">Bulk invite users</h3>
              <p className="text-sm">Invite multiple users at once through a file import</p>
            </div>
            <Link href="invite/" className="btn w-full btn-outline btn-primary">
              Bulk Invite Users
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full gap-8">
        <PendingInvitesTable />
        <RegisteredUsersTable />
      </div>
      <UserInvite
        isOpen={isOpen}
        onRequestClose={closeModal}
        onSuccess={refreshQuery}
        submitSuccess={inviteSuccess}
        setSubmitSuccess={setInviteSuccess}
      />
      <div className={cx('sticky bottom-10 w-full transition', { hidden: !inviteSuccess })}>
        <Alert
          level="info"
          message="User invite sent."
          className="text-white lg:w-7/12 mx-auto"
          onRequestClose={() => setInviteSuccess(false)}
          dismissable
        />
      </div>
    </div>
  );
};

Page.getLayout = (page) => <AdminPageLayout pageName="Users">{page}</AdminPageLayout>;

// -- Configure AuthGuard -- //
Page.allowAuthenticated = true;
Page.roles = ['admin'];
// Page.aclAbilities = [['View', 'Users']];

export default Page;
