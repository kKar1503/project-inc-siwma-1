import { FaUserCheck, FaRegEnvelope, FaRegBuilding } from 'react-icons/fa';
import AdminFigure from '../components/AdminFigure';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import RegisteredUsersTableWithoutCheckbox from '../components/Tables/RegisteredUsersTableWithoutCheckbox';
import PendingInvitesTableWithoutCheckbox from '../components/Tables/PendingInvitesTableWithoutCheckbox';

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
      <AdminFigure
        title="Active Companies"
        value="20"
        color="text-primary"
        icon={<FaRegBuilding size={144} color="#2563eb" />}
      />
      <AdminFigure
        title="Total Users"
        value="14"
        color="text-accent"
        icon={<FaUserCheck size={144} color="#34d399" />}
      />
      <AdminFigure
        title="Pending Invites"
        value="15"
        color="text-warning"
        icon={<FaRegEnvelope size={144} color="#facc15" />}
      />
    </div>

    <div className="flex flex-row w-full gap-8">
      <RegisteredUsersTableWithoutCheckbox className="" data={registeredUsersData} />
      <PendingInvitesTableWithoutCheckbox className="" data={inviteTableData} />
    </div>
  </div>
);

UserOverview.getLayout = (page) => <AdminPageLayout pageName="Overview">{page}</AdminPageLayout>;

export default UserOverview;
