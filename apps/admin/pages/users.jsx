import { useState } from 'react';
import NavBar from '../components/NavBar';
import UserInvite from '../components/Modals/UserInvite';
import RegisteredUsersTable from '../components/Tables/RegisteredUsersTable';
import PendingInvitesTable from '../components/Tables/PendingInvitesTable';
import AdminPageLayout from '../components/layouts/AdminPageLayout';

const inviteTableData = (id) => ({
  id,
  company: 'GUANGZHAO METALWORKS, PTE. LTD',
  email: 'sallyknox_slfi@gmail.com',
  mobileNumber: '+65 9832 0293',
});

const registerTableData = (id) => ({
  id,
  name: 'Sally Knox',
  email: 'sallyknox_slfi@gmail.com',
  company: 'Shi Lin Fang Ironwork PTE, LTD',
  mobileNumber: '+65 9832 0293',
});

function populateArray(element, count) {
  const result = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    result[i] = element(i + 1);
  }

  return result;
}

const UsersPage = () => (
  <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto xl:max-h-screen">
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
    <PendingInvitesTable data={populateArray(inviteTableData, 15)} />
    <RegisteredUsersTable data={populateArray(registerTableData, 30)} />
    <UserInvite />
  </div>
);

UsersPage.getLayout = (page) => <AdminPageLayout pageName="Users">{page}</AdminPageLayout>;

export default UsersPage;
