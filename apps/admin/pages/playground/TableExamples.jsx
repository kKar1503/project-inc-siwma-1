import RegisteredUsersTable from '../../components/Tables/RegisteredUsersTable';
import RegisteredUsersTableWithoutCheckbox from '../../components/Tables/RegisteredUsersTableWithoutCheckbox';
import PendingInvitesTable from '../../components/Tables/PendingInvitesTable';
import RegisteredCompaniesTable from '../../components/Tables/RegisteredCompaniesTable';
import UserInvitesPreviewTable from '../../components/Tables/UserInvitesPreviewTable';

/**
 * @type {import("next").NextPage}
 */
const Page = () => {
  const registeredUsersData = [
    {
      id: 1,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      name: 'John Doe',
      email: 'john@doe.com',
      company: 'Company',
      mobileNumber: '+65 9832 0293',
    },
    {
      id: 2,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      name: 'Veryvery Long Name',
      email: 'veryverylongname@veryverylongdomain.com',
      company: 'Very Very Long Company Name',
      mobileNumber: '+65 9832 0293',
    },
    {
      id: 3,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      name: 'John Doe',
      email: 'john@doe.com',
      company: 'Company',
      mobileNumber: '+65 9832 0293',
    },
    {
      id: 4,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      name: 'John Doe',
      email: 'john@doe.com',
      company: 'Company',
      mobileNumber: '+65 9832 0293',
    },
    {
      id: 5,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      name: 'John Doe',
      email: 'john@doe.com',
      company: 'Company',
      mobileNumber: '+65 9832 0293',
    },
  ];

  const pendingInvitesData = [
    {
      id: 1,
      company: 'Company',
      email: 'john@doe.com',
      mobileNumber: '+65 9832 0293',
    },
    {
      id: 2,
      company: 'Very Very Long Company Name',
      email: 'veryverylongname@veryverylongdomain.com',
      mobileNumber: '+65 9832 0293',
    },
  ];

  const registeredCompaniesData = [
    {
      id: 1,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      company: 'Company',
      website: 'www.company.com',
      bio: 'Company Bio',
    },
    {
      id: 2,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      company: 'Very Very Long Company Name',
      website: 'veryverylongname@veryverylongdomain.com',
      bio: 'Very Very Long Company Bio',
    },
  ];

  const userInvitesPreviewData = [
    {
      id: 1,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      name: 'John Doe',
      email: 'hello@hello.com',
      company: 'Company',
      mobileNumber: '+65 9832 0293',
    },
    {
      id: 2,
      profilePicture:
        'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg',
      name: 'John Doe',
      email: 'hello@hello.com',
      company: 'Company',
      mobileNumber: '+65 9832 0293',
    },
  ];

  return (
    <div className="bg-[#FAFAFA] w-full">
      <div className="flex flex-row m-5">
        {/* Fixed Height ensures the table doesn't take up the entire page, and allows scrolling. For best results, this should be at least h-96. */}
        <RegisteredUsersTable data={registeredUsersData} className="h-96" />
      </div>
      <div className="flex flex-row m-5">
        <RegisteredUsersTableWithoutCheckbox data={registeredUsersData} className="h-96" />
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-row m-5">
          <PendingInvitesTable data={pendingInvitesData} className="h-96" />
        </div>
        <div className="flex flex-row m-5">
          <RegisteredCompaniesTable data={registeredCompaniesData} className="h-96" />
        </div>
      </div>
      <div className="flex flex-row m-5">
        <UserInvitesPreviewTable data={userInvitesPreviewData} className="h-96" />
      </div>
    </div>
  );
};

export default Page;
