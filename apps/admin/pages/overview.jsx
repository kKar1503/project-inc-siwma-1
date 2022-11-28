import { FaUserCheck, FaRegEnvelope, FaRegBuilding } from 'react-icons/fa';

import AdminPageLayout from '../components/layouts/AdminPageLayout';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import RegisteredUsersTableWithoutCheckbox from '../components/Tables/RegisteredUsersTableWithoutCheckbox';
import PendingInvitesTableWithoutCheckbox from '../components/Tables/PendingInvitesTableWithoutCheckbox';
import CompanyFigure from '../components/adminFigures/CompanyFigure';
import UsersFigure from '../components/adminFigures/UsersFigure';
import InvitesFigure from '../components/adminFigures/InvitesFigure';

const inviteTableData = [
  {
    id: 1,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 2,
    email: 'veryverylongname@veryverylongdomain.com',
    company: 'Very Very Long Company Name',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 3,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 4,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 5,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 6,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 7,
    email: 'veryverylongname@veryverylongdomain.com',
    company: 'Very Very Long Company Name',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 8,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 9,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 10,
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
];

const registeredUsersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 2,
    name: 'Veryvery Long Name',
    email: 'veryverylongname@veryverylongdomain.com',
    company: 'Very Very Long Company Name',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 4,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 6,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 7,
    name: 'Veryvery Long Name',
    email: 'veryverylongname@veryverylongdomain.com',
    company: 'Very Very Long Company Name',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 8,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 9,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
  {
    id: 10,
    name: 'John Doe',
    email: 'john@doe.com',
    company: 'Company',
    mobileNumber: '+65 9832 0293',
  },
];

const UserOverview = () => (
  <div className="flex flex-col w-full h-full gap-8 p-8 overflow-auto">
    <NavBar />

    <div className="flex flex-row gap-8 flex-wrap">
      <CompanyFigure />
      <UsersFigure />
      <InvitesFigure />
    </div>

    <div className="flex flex-row flex-wrap w-full gap-8">
      <RegisteredUsersTableWithoutCheckbox
        className="h-fit max-h-full"
        data={registeredUsersData}
      />
      <PendingInvitesTableWithoutCheckbox className="h-fit max-h-full" data={inviteTableData} />
    </div>
  </div>
);

UserOverview.getLayout = (page) => <AdminPageLayout pageName="Overview">{page}</AdminPageLayout>;

export default UserOverview;
