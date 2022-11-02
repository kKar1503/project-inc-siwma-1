import Head from 'next/head';
import pic from '../public/siwma-logo-sm.png';
import AdminFigure from '../components/AdminFigure';
import BaseTable from '../components/Tables/BaseTable';
import RegisteredUsersTable from '../components/Tables/RegisteredUsersTable';
import RegisteredUsersTableWithoutCheckbox from '../components/Tables/RegisteredUsersTableWithoutCheckbox';
import PendingInvitesTable from '../components/Tables/PendingInvitesTable';
import RegisteredCompaniesTable from '../components/Tables/RegisteredCompaniesTable';
import TableButton from '../components/Tables/TableButton';

const Home = () => {
  const registeredUsersData = [
    {
      id: 1,
      profilePicture: pic,
      name: 'John Doe',
      email: 'john@doe.com',
      company: 'Company',
      mobileNumber: '+65 9832 0293',
    },
    {
      id: 2,
      profilePicture: pic,
      name: 'Veryvery Long Name',
      email: 'veryverylongname@veryverylongdomain.com',
      company: 'Very Very Long Company Name',
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
      profilePicture: pic,
      company: 'Company',
      website: 'www.company.com',
      bio: 'Company Bio',
    },
    {
      id: 2,
      profilePicture: pic,
      company: 'Very Very Long Company Name',
      website: 'veryverylongname@veryverylongdomain.com',
      bio: 'Very Very Long Company Bio',
    },
  ];

  return (
    <div className="bg-[#FAFAFA]">
      <Head>
        <title>Team B</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row w-full h-full gap-8">
        <div className="bg-white shadow-xl rounded-lg p-4 w-2/12 h-full" />
        <div className="flex flex-row flex-wrap w-full h-full gap-8 p-8">
          <AdminFigure title="Registered Companies" value="1,234" color="text-primary" />
          <AdminFigure title="Total Users" value="4,568" color="text-accent" />
          <AdminFigure title="Pending Invites" value="5,983" color="text-secondary" />
        </div>
      </div>
      <div className="flex flex-row m-5">
        <RegisteredUsersTable data={registeredUsersData} />
      </div>
      <div className="flex flex-row m-5">
        <RegisteredUsersTableWithoutCheckbox data={registeredUsersData} />
      </div>
      <div className="flex flex-row m-5">
        <PendingInvitesTable data={pendingInvitesData} />
      </div>
      <div className="flex flex-row m-5">
        <RegisteredCompaniesTable data={registeredCompaniesData} />
      </div>
    </div>
  );
};

/**
 * Use the layout for Admin Pages
 */
Home.getLayout = (page) => <AdminPageLayout pageName="Overview">{page}</AdminPageLayout>;

export default Home;
