import { QueryClientProvider, QueryClient } from 'react-query';
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

const queryClient = new QueryClient();

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
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
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
        <NavBar />
        <div className="grid grid-cols-2 gap-8">
          <div className="rounded-lg card bg-base-100 shadow-lg">
            <div className="card-body">
              <h1 className="font-bold text-xl">Create an individual invite</h1>
              <h1 className="pr-2 pb-4">Invite an individual user to the system</h1>
              <div className="card-actions justify-center">
                <button onClick={openModal} className="btn btn-primary btn-outline grow">
                  Send Invite
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg card bg-base-100 shadow-lg">
            <div className="card-body">
              <h1 className="font-bold text-xl">Bulk invite users</h1>
              <h1 className="pr-2 pb-4">Invite multiple users at once through a file import</h1>
              <div className="card-actions justify-center">
                <Link href="invite/" className="w-full btn btn-outline btn-primary">
                  Bulk Invite Users
                </Link>
              </div>
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
      </div>
      <div className={cx('w-full transition', { hidden: !inviteSuccess })}>
        <Alert
          level="info"
          message="User invite sent."
          className="text-white absolute bottom-10 left-0 transition lg:w-7/12 mx-auto"
          onRequestClose={() => setInviteSuccess(false)}
          dismissable
        />
      </div>
    </QueryClientProvider>
  );
};

Page.getLayout = (page) => <AdminPageLayout pageName="Users">{page}</AdminPageLayout>;

// -- Configure AuthGuard -- //
Page.allowAuthenticated = true;
Page.roles = ['admin'];
// Page.aclAbilities = [['View', 'Users']];

export default Page;
