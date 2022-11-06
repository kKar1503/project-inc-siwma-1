import { FaUserCheck, FaRegEnvelope, FaRegBuilding } from 'react-icons/fa';
import AdminFigure from '../../../components/AdminFigure';
import AdminPageLayout from '../../../components/layouts/AdminPageLayout';
import NavBar from '../../../components/NavBar';
import RegisteredUsersTableWithoutCheckbox from '../../../components/Tables/RegisteredUsersTableWithoutCheckbox';
import PendingInvitesTable from '../../../components/Tables/PendingInvitesTable';

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

const UserOverview = () => (
  <div className="flex flex-col w-full h-full gap-8 p-8 overflow-auto">
    {/* { replace this with sidebar } */}
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

      <RegisteredUsersTableWithoutCheckbox className="" data={registeredUsersData} />
      <PendingInvitesTableWithoutCheckbox className="" data={inviteTableData} />
    </div>
