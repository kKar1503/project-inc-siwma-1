/* eslint-disable no-alert */
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
    await Promise.all(
      companyData.map(async (company) => {
        const res = await supabase
          .from('companies')
          .insert([{ name: company.name }])
          .single();
        if (res.error) {
          // TODO: Replace with custom alert component
          alert(res.error);
        }
      })
    );

    await Promise.all(
      userData.map(async (user) => {
        // Create sha256 hash of the user's name, email, the current date, and a random string
        const tokenHash = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(
            user.name + user.email + Date.now() + Math.random().toString(16).substr(2, 8)
          )
        );
        // Convert the hash to a hex string
        const token = Array.from(new Uint8Array(tokenHash))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

        // Find company id from supabase
        const res = await supabase.from('companies').select('id').eq('name', user.company).limit(1);
        if (res.error) {
          // TODO: Replace with custom alert component
          alert(res.error);
          return;
        }

        const { id } = res.data[0];

        const { data, err } = await supabase
          .from('invite')
          .insert({
            name: user.name,
            email: user.email,
            company: id,
            token,
            expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          })
          .single();

        if (err) {
          // TODO: Replace with custom alert component
          alert(err);
        }
      })
    );

    // TODO: Replace with custom alert component
    alert('Invites sent!');
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
              disabled={error}
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

// -- Configure AuthGuard -- //
InvitesPage.allowAuthenticated = true;
InvitesPage.roles = ['admin'];
// Page.aclAbilities = [['View', 'Users']];

export default InvitesPage;
