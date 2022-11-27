import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import cx from 'classnames';
import FileUpload from '../components/FileUpload';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import CompanyProfilesPreviewTable from '../components/Tables/CompanyProfilesPreviewTable';
import UserInvitesPreviewTable from '../components/Tables/UserInvitesPreviewTable';

const InvitesPage = () => {
  const supabase = useSupabaseClient();
  const [userTableData, setUserTableData] = useState([]);
  const [companyTableData, setCompanyTableData] = useState([]);
  const [error, setError] = useState(false);

  async function inviteUsers(companyData, userData) {
    console.log(companyData);

    /* TODO:
     * Generate token properly
     * Proper error handling
     * Enter proper company id instead of 0
     * Validation: Don't overwrite existing companies
     * Validation: Don't invite existing users
     */

    companyData.forEach(async (company) => {
      const { result, err } = await supabase
        .from('companies')
        .insert([{ name: company.name }])
        .single();
      if (err) {
        console.error(err);
      }
    });

    console.log(userData);

    userData.forEach(async (element) => {
      const { result, err } = await supabase
        .from('invite')
        .insert({
          name: element.name,
          email: element.email,
          company: 1,
          token: 'token',
          expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        })
        .single();
    });
  }

  return (
    <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto xl:max-h-screen">
      <NavBar />
      <div className="flex flex-col lg:grid lg:grid-flow-row grid-cols-12 gap-8 flex-1 xl:overflow-hidden">
        <FileUpload
          className="h-full col-span-4"
          disabled
          setUserTableData={setUserTableData}
          setCompanyTableData={setCompanyTableData}
          setError={setError}
        />
        <div className="flex flex-col col-start-5 col-end-13 gap-8 flex-1 justify-between xl:overflow-hidden">
          <CompanyProfilesPreviewTable data={companyTableData} />
          <UserInvitesPreviewTable data={userTableData} />
          <div className="flex justify-end">
            <button
              className={cx(
                error ? 'btn-error' : 'btn-primary',
                'btn rounded-lg btn-wide disabled:pointer-events-none'
              )}
              onClick={() => inviteUsers(companyTableData, userTableData)}
              // disabled={error}
            >
              Confirm
            </button>
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
