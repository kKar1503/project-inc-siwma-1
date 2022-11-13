import FileUpload from '../components/FileUpload';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import CompanyProfilesPreviewTable from '../components/Tables/CompanyProfilesPreviewTable';
import UserInvitesPreviewTable from '../components/Tables/UserInvitesPreviewTable';

/**
 * Sample data
 */
const userTableData = (id) => ({
  id,
  company: 'GUANGZHAO METALWORKS, PTE. LTD',
  email: 'sallyknox_slfi@gmail.com',
  mobileNumber: '+65 9832 0293',
});

const companyTableData = (id) => ({
  id,
  company: 'GUANGZHAO METALWORKS, PTE. LTD',
  website: 'www.guangzhaomw.com',
});

function populateArray(element, count) {
  const result = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    result[i] = element(i + 1);
  }

  return result;
}

const InvitesPage = () => (
  <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto xl:max-h-screen">
    <NavBar />
    <div className="flex flex-col lg:grid lg:grid-flow-row grid-cols-12 gap-8 flex-1 xl:overflow-hidden">
      <FileUpload className="h-full col-span-4" />
      <div className="flex flex-col col-start-5 col-end-13 gap-8 flex-1 justify-between xl:overflow-hidden">
        <CompanyProfilesPreviewTable data={populateArray(companyTableData, 15)} />
        <UserInvitesPreviewTable data={populateArray(userTableData, 30)} />
        <div className="flex justify-end">
          <button className="btn btn-primary rounded-lg btn-wide">Confirm</button>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Use the layout for Admin Pages
 */
InvitesPage.getLayout = (page) => <AdminPageLayout pageName="Invites">{page}</AdminPageLayout>;

export default InvitesPage;
