import { QueryClientProvider, QueryClient } from 'react-query';
import NavBar from '../components/NavBar';
import UserInvite from '../components/Modals/UserInvite';
import RegisteredUsersTable from '../components/Tables/RegisteredUsersTable';
import PendingInvitesTable from '../components/Tables/PendingInvitesTable';
import AdminPageLayout from '../components/layouts/AdminPageLayout';

/**
 * Comment to be written
 */

const queryClient = new QueryClient();

const Page = () => (
  <QueryClientProvider client={queryClient}>
    <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
      <NavBar />
      <div className="grid grid-cols-2 gap-10">
        <div className="rounded-lg card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Create an individual invite</h2>
            <p>Invite an individual user to the system</p>
            <div className="card-actions justify-center">
              <label htmlFor="user-invite" className="btn btn-primary btn-outline grow">
                Send Invite
              </label>
            </div>
          </div>
        </div>
        <div className="rounded-lg card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Bulk invite users</h2>
            <p>Invite multiple users at once through a file import</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary btn-outline grow">Send Invite</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <PendingInvitesTable className="mb-10" />
        <RegisteredUsersTable />
      </div>
      <UserInvite />
    </div>
  </QueryClientProvider>
);

Page.getLayout = (page) => <AdminPageLayout pageName="Users">{page}</AdminPageLayout>;

export default Page;
