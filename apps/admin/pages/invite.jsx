import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import CompanyProfilesPreviewTable from '../components/Tables/CompanyProfilesPreviewTable';
import UserInvitesPreviewTable from '../components/Tables/UserInvitesPreviewTable';

const InvitesPage = () => {
  const [userTableData, setUserTableData] = useState([]);
  const [companyTableData, setCompanyTableData] = useState([]);

  return (
    <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto xl:max-h-screen">
      <NavBar />
      <div className="flex flex-col lg:grid lg:grid-flow-row grid-cols-12 gap-8 flex-1 xl:overflow-hidden">
        <FileUpload
          className="h-full col-span-4"
          setUserTableData={setUserTableData}
          setCompanyTableData={setCompanyTableData}
        />
        <div className="flex flex-col col-start-5 col-end-13 gap-8 flex-1 justify-between xl:overflow-hidden">
          <CompanyProfilesPreviewTable data={companyTableData} />
          <UserInvitesPreviewTable data={userTableData} />
          <div className="flex justify-end">
            <button className="btn btn-primary rounded-lg btn-wide">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Use the layout for Admin Pages
 */
InvitesPage.getLayout = (page) => <AdminPageLayout pageName="Invites">{page}</AdminPageLayout>;

export default InvitesPage;
